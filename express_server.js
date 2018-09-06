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

//Showing Current Urls in UrlDatabase
app.get("/urls/:id", (req, res) => {
    let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };

    res.render("urls_show", templateVars);
    });

//Redirect to longurl website with short URl
app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});
    
//Listening Local Host Port  
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//Random String for ShortUrl Genorator
  function generateRandomString() {
    let randomKey = "";
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
for (let i = 0; i < 6 ; i++) {
  randomKey += character.charAt(Math.floor(Math.random() * character.length));
}
return randomKey;
}

//Utalizing random string to create new URL
app.post("/urls", (req, res) => {
     
  var makeShortUrl = generateRandomString();
  var myShortURL = makeShortUrl
  var makeLongString = req.body['longURL']
  urlDatabase[makeShortUrl] = makeLongString
  res.redirect("/urls/" + myShortURL) 
});

   // Delete existing url
   app.post('/urls/:id/delete', (req, res) => {
    let targetId = req.params.id;
  delete urlDatabase[targetId]
    res.redirect('/urls');
  });

// edit url
  app.post('/urls/:id/edit', (req, res)=> {
    let targetId = req.params.id;
    urlDatabase[targetId] = req.body['longURL']
    res.redirect('/urls/')
  });

  // res.cookie('userid','rohit');

  app.post('/login', (req, res)=> {
    res.cookie('username', req.body.username);
    res.redirect('/urls');
  });

// res.cookie

//create cookie with res.cookie