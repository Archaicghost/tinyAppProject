//Worked with bguids91 and alefiyaV
var express = require('express');
var app = express();
var PORT = 8080; // default port 8080
var cookieParser = require('cookie-parser');

app.use(cookieParser())


//middleware
app.set('view engine', 'ejs');


//Database of urls 
var urlDatabase = {
 'b2xVn2': 'http://www.lighthouselabs.ca',
 '9sm5xK': 'http://www.google.com'
};


//
app.get('/', (req, res) => {
let username = req.cookies.username
if (req.cookies){
   username = req.cookies.username
} else {
  username = undefined };

  let templateVars = {
    username: username,
    urls: urlDatabase,
  };

  console.log(templateVars.username)
  res.render('urls_index', templateVars);
  });
 


//list of all urls
app.get('/urls', (req, res) => {
  let username = req.cookies.username
  if (req.cookies){
     username = req.cookies.username
  } else {
    username = undefined };
  
    let templateVars = {
      username: username,
      urls: urlDatabase,
    };
  
    console.log(templateVars);
    res.render('urls_index', templateVars)
    });

    //Accept Form info
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


//Create New Urls
app.get('/urls/new', (req, res) => {
 
  let username = req.cookies.username
  if (req.cookies){
     username = req.cookies.username
  } else {
    username = undefined };
  
    let templateVars = {
      username: username,
      urls: urlDatabase,
    };
  
res.render('urls_new', templateVars);
});

//Showing Current Urls in UrlDatabase
app.get('/urls/:id', (req, res) => {
  let username = req.cookies.username
  let shortURL = req.params.id
  let longURL = urlDatabase[shortURL]
  if (req.cookies){
     username = req.cookies.username
  } else {
    username = undefined };
  
    let templateVars = {
      username: username,
      urls: urlDatabase,
      shortURL: shortURL,
      longURL: longURL

    };
  
    res.render('urls_show', templateVars);
    });

//Redirect to longurl website with short URl
app.get('/u/:shortURL', (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});
    
//Listening Local Host Port  
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//Random String for ShortUrl Genorator
  function generateRandomString() {
    let randomKey = '';
    let character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
for (let i = 0; i < 6 ; i++) {
  randomKey += character.charAt(Math.floor(Math.random() * character.length));
}
return randomKey;
}

//Utalizing random string to create new URL
app.post('/urls', (req, res) => {
  let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };
  var makeShortUrl = generateRandomString();
  var myShortURL = makeShortUrl
  var makeLongString = req.body['longURL']
  urlDatabase[makeShortUrl] = makeLongString
  res.redirect('/urls/' + myShortURL) 
});

   // Delete existing url
   app.post('/urls/:id/delete', (req, res) => {
    let targetId = req.params.id;
  delete urlDatabase[targetId]
    res.redirect('/urls');
  });

// edit url
  app.post('/urls/:id/edit', (req, res)=> {
    let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };
    let targetId = req.params.id;
    urlDatabase[targetId] = req.body['longURL']
    res.redirect('/urls/')
  });

//cookie login
  app.post('/login', (req, res)=> {
    res.cookie('username', req.body.username);
    res.redirect('/urls');
  });
  
//cookie logout
  app.post('/logout', (req, res)=> {
    res.clearCookie('username', req.body.username);
    res.redirect('/urls');
  });

