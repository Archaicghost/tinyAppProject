//Worked with bguids91 and alefiyaV
var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

//middleware
app.set("view engine", "ejs");

//Database of urls 
var urlDatabase = {
 "b2xVn2": "http://www.lighthouselabs.ca",
 "9sm5xK": "http://www.google.com"
};

//list of all urls
app.get("/urls", (req, res) => {
    let templateVars = { urls : urlDatabase};
    res.render("urls_index", templateVars)
    });

    //Accept Form info
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


//Create New Urls
app.get("/urls/new", (req, res) => {
res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
    let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };

    res.render("urls_show", templateVars);
    });

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});
    
  
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//Add new urls with create url



  function generateRandomString() {
    let randomKey = "";
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
for (let i = 0; i < 6 ; i++) {
  randomKey += character.charAt(Math.floor(Math.random() * character.length));
}
return randomKey;
}

app.post("/urls", (req, res) => {
     
  var makeShortUrl = generateRandomString();
  var myShortURL = makeShortUrl
  var makeLongString = req.body['longURL']
  urlDatabase[makeShortUrl] = makeLongString
  res.redirect("/urls/" + myShortURL)
  // res.send(makeShortUrl + ": " + req.body['longURL']);     
});

   // Delete existing url
   app.post('/urls/:id/delete', (req, res) => {
    let targetId = req.params.id;
  delete urlDatabase[targetId]
    res.redirect('/urls');
  });


  app.post('/urls/:id/edit', (req, res)=> {
    let targetId = req.params.id;
    urlDatabase[targetId] = req.body['longURL']
    res.redirect('/urls/')
  });


  
  



//recieve new url
//attach random string to url
//add url and random string to database
//respond with redirection to shortURL


//Worked with bguids91 and alefiyaV