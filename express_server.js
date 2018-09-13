//Worked with bguids91 and alefiyaV

//*************Tiny App Set Up*************

const express = require('express');
const app = express();
let PORT =  8080; // default port 8080
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


//Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['secretPass'],
// **Cookie Options**
  maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
}));

//Listening Local Host Port  
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//Global Objects
let urlDatabase = {
 'b2xVn2': 'http://www.lighthouselabs.ca',
 '9sm5xK': 'http://www.google.com',
};
const users = { 
  'userRandomID': {
    id: 'userRandomID', 
    email: 'user@example.com', 
    password: 'purple-monkey-dinosaur'
  },
 'user2RandomID': {
    id: 'user2RandomID', 
    email: 'user2@example.com', 
    password: 'dishwasher-funk'
  }
}

//*************Functions*************

//Random String for ShortUrl Genorator
function generateRandomString() {
  let randomKey = '';
  let character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz'

  for (let i = 0; i < 6 ; i++) {
    randomKey += character.charAt(Math.floor(Math.random() * character.length));
  }
      return randomKey;
};

//Verification of Username/Email to Database
function findUser(email){

  for (let key in users) { 
    if (users[key].email === email)
      return users[key] ;
  }
};

//Urls created by user
function urlsForUser(id) {
  let userUrls = {};
  for (key in urlDatabase) {
  userUrls[key] = urlDatabase[key]

  if (urlDatabase[key] === id);{
    userUrls[key] = urlDatabase[key]
  }
}
  return userUrls
}


//*************GET Requests*************

//*******Render*******
//Create account/register page
app.get('/urls/register', (req, res) => {  
  let userEmail = req.session.email
  let templateVars = {
    users: userEmail,
    urls: urlDatabase,
  };
  res.render("urls_register", templateVars);
  });

//List all the Tiny Url's and Long Url's
app.get('/urls', (req, res) => {
   let userEmail = req.session.user_id
   if (req.session.user_id){
       userEmail = users[req.session.user_id]; 
     
    
   } else {
       userEmail = undefined 
   }
   let templateVars = {
     users: userEmail,
     urls: urlDatabase,
   }
  res.render('urls_index', templateVars); //xxxx
});

//Login
app.get('/urls/login', (req, res) => {  
  let userEmail = req.session.email
  let templateVars = {
    users: userEmail,
    urls: urlDatabase,
  };
  res.render("urls_login", templateVars);
});

//Create New Urls
app.get('/urls/new', (req, res) => {
  let userEmail = req.session.user_id;
  let templateVars = {
    users: userEmail,
    urls: urlDatabase, 
  }
  if (users[req.session.user_id]) { 
      userEmail = req.session.user_id;
      } else { 
      userEmail = undefined
     };
     res.render('urls_new', templateVars); 
});

//Display the Long Url and its Shortened Form
app.get('/urls/:id', (req, res) => {
  let userEmail = req.session.user_id
  let shortURL = req.params.id
  let longURL = urlDatabase[shortURL]

  if (req.session.user_id){
      userEmail = users[req.session.user_id];
      userUrls = urlsForUser(userEmail)
  } else {
      userEmail = undefined 
  }
  
    let templateVars = {
      users: userEmail,
      urls: userUrls,
      longURL: longURL,
      shortURL: shortURL,
    }
  
  res.render('urls_show', templateVars);
});


app.get('/', (req, res) => {
  let userEmail = req.session.email
  let shortURL = req.params.id;
  let templateVars = {
    users: userEmail,
    urls: urlDatabase,
    shortURL: shortURL
  };

 res.render('urls_index', templateVars);
 });

 //Showing Current Urls in UrlDatabase
app.get('/urls/:id', (req, res) => {
  let shortURL = req.params.id;
  let longURL = req.body['longURL'];
  let userEmail = req.session.user_id;
  if (req.session){
      userEmail = users[req.session.user_id];
      userUrls = urlsForUser(userEmail)
  } else {
      userEmail = undefined 
  };
    let templateVars = {
      users: userEmail,
      urls: userUrls,
      shortURL: shortURL,
      longURL: longURL
    };
  
    res.render('urls_show', templateVars);
    });


//Redirect to longurl website with short URl
app.get('/u/:shortURL', (req, res) => {
  let shortURL = req.params.shortURL;
  let longURL = urlDatabase[shortURL]
  res.redirect('http://www.' + longURL);///xxxx
});


//*************POST Requests*************
//cookie login
app.post('/urls/login', (req, res)=> {
  let email = req.body.email;
  let password = req.body.password;
  let user = findUser(email)
  
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user_id = user.id
      res.redirect('/urls')
      console.log('I checked password')

    } else if (email === '' || password === '' ) {
      res.send('Error: 400 Bad Request - Email or password cannot be empty!')

    } else { 
      res.redirect('/urls/login');
    
    } 

});


//cookie logout
app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/urls');
});


// Registration Requirments
app.post('/urls/register', (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  let foundUser = findUser(email) ? true : false
  let hashPass = bcrypt.hashSync(password, 10);
  

// Prevent Empty Username and Password Feild
  if (users === '' || password === '' ) {
    res.send('Error: 400 Bad Request - Email or password cannot be empty!')
    
  //Prevent duplicate emails
  } else if(foundUser === true) { 
    res.send('Error: 400 Bad Request - Email already in use!')
  } 
   let id = generateRandomString();
    let newUser = {id: id, email: email, password: hashPass};
      users[id] = newUser
  
      req.session.user_id = id;
res.redirect('/urls')
});

//Useing random string to create new URL
app.post('/urls', (req, res) => {
  var makeShortUrl = generateRandomString();
  var myShortURL = makeShortUrl
  var makeLongString = req.body['longURL']

    urlDatabase[myShortURL] = {longURL: makeLongString}
    

  res.redirect('/urls/' + myShortURL) 
});

   // Delete existing URL
   app.post('/urls/:id/delete', (req, res) => {
    let targetId = req.params.id;
      delete urlDatabase[targetId]

    res.redirect('/urls');
  });

  // Edit existing URL
  app.post('/urls/:id/edit', (req, res)=> {
    let targetId = req.params.id;

      urlDatabase[targetId] = req.body['longURL']

    res.redirect('/urls/')
  });