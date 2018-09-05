var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

app.set("view engine", "ejs");


var urlDatabase = {
 "b2xVn2": "http://www.lighthouselabs.ca",
 "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls", (req, res) => {
    let templateVars = { urls : urlDatabase};
    res.render("urls_index", templateVars)
    });

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
    
app.get("/urls/new", (req, res) => {
res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
    let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };
        console.log(req.param.id)
    res.render("urls_show", templateVars);
    
    });

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
  
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.post("/urls", (req, res) => {
    console.log(req.body[`longURL`]);  // debug statement to see POST parameters
    res.send(generateRandomString(req.body));         // Respond with 'Ok' (we will replace this)
  });


  function generateRandomString() {
    let randomKey = "";
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
for (let i = 0; i < 6 ; i++) {
  randomKey += character.charAt(Math.floor(Math.random() * character.length));
}
return randomKey;
}


app.get("/u/:shortURL", (req, res) => {
    // let longURL = 
    res.redirect()
  });


//recieve new url
//attach random string to url
//add url and random string to database
//respond with redirection to shortURL