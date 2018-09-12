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
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUnitialized: true,
//   cookie: { secure: true }
// }));
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });


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
  let character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

  for (let i = 0; i < 6 ; i++) {
    randomKey += character.charAt(Math.floor(Math.random() * character.length));
  }
      return randomKey;
};

//Verification of Username/Email to Database
function findUser(username){

  for (let keys in users) { 
    if (users[keys].username === username)
      return true;
  }
};

// //Verify user
function credentialCheck(email, pass) {
  for(let keys in users) {
    if(users[keys].email === email && users[key].password === pass) {
      return user[keys]
    }
  };
}

// //Urls create by user
// function createNewUrls(id)
// let userKeys = urlDatabase[keys]
// let createdUrls = {};
//   if (userKeys = id);
//     userKeys = userKeys
//   }
// }
// return createdUrls

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
   let userEmail = req.session.email
   if (req.session.user_id){
       userEmail = users[req.session.user_id]; 
     
    
   } else {
       userEmail = undefined 
   };
   let templateVars = {
     users: userEmail,
     urls: urlDatabase,
   };
  

  res.render('urls_index', templateVars);
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

//Display the Long Url and its Shortened Form
app.get('/urls/:id', (req, res) => {
  let userEmail = req.session.user_id
  let shortURL = req.params.id
  let longURL = urlDatabase[shortURL]
  if (req.session.user_id){
      userEmail = users[req.session.user_id];
      //username = req.cookies.user_id
  } else {
      userEmail = undefined 
  };
  
    let templateVars = {
      users: userEmail,
      urls: urlDatabase,
      longURL: longURL,
      shortURL: shortURL,
    };
  
  res.render('urls_show', templateVars);
});

//Create New Urls
app.get('/urls/new', (req, res) => {
  let userEmail = req.session.user_id
  if (req.session.user_id){
      userEmail = users[req.session.user_id];
      //username = req.cookies.user_id
  } else {
      userEmail = undefined 
  };
  console.log(req.session.user_id)
  let templateVars = {
    users: userEmail,
    urls: urlDatabase,
  };
  
  res.render('urls_new', templateVars);
});

app.get('/', (req, res) => {
  let userEmail = req.session.email
  let templateVars = {
    users: userEmail,
    urls: urlDatabase,
  };

 console.log(templateVars.users)
 res.render('urls_index', templateVars);
 });

 //Showing Current Urls in UrlDatabase
app.get('/urls/:id', (req, res) => {
  let shortURL = req.params.id;
  let longURL = req.body['longURL'];
  let userEmail = req.session.user_id;
  if (req.session){
      userEmail = users[req.session.user_id];
    
  } else {
      userEmail = undefined 
  };
    let templateVars = {

      users: userEmail,
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


//*************POST Requests*************
//cookie login
app.post('/urls/login', (req, res)=> {
  credentialCheck(user);
  let email = req.body.email;
  let password = req.body.password;
  let hashPass = bcrypt.hashSync(password, 10);
  
  for (let user in users) {
        if (users[user].password === hashPass &&req.body.email === users[user].email) {
          user = users['email']
           res.redirect('/urls');
      }
  //Prevent duplicate emails
    } if (email === '' || password === '' ) {
    res.send('Error: 400 Bad Request - Email or password cannot be empty!')

  } else { 
    res.redirect('/login');
    
  } 

});


//cookie logout
app.post('/logout', (req, res)=> {
  req.session = null
  res.redirect('/urls');
});


// Registration Requirments
app.post('/urls/register', (req, res) => {
console.log("I am here");

  let email = req.body.email;
  let password = req.body.password;
  let foundUser = findUser(users)
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
console.log(newUser, "hihih");
      users[id] = {id: id, email: email, password: hashPass};
  
      req.session.user_id = id;
console.log(users, "lolololol");
console.log(newUser, "hahahaha") 
res.redirect('/urls')
});

//Useing random string to create new URL
app.post('/urls', (req, res) => {
  var makeShortUrl = generateRandomString();
  var myShortURL = makeShortUrl
  var makeLongString = req.body['longURL']

    urlDatabase[myShortURL] = makeLongString

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