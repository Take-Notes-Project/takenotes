## Session and Cookies
 a session is a temporary and interactive information interchange between two or more communicating devices, or between a computer and user - a login session is the period between the user logging in and
 out of a system.

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

### Some more info about Cookies: 
**************************************************
From a technical perspective, the definition of a Cookie can be found here. Loosely, think of a cookie as a piece of data returned by the Web Server you connected to in the past. This data is associated with the host that returned that data and can never be seen by other hosts. When you subsequently connect to the host in the future, the previously returned value (the cookie value) is sent back to the server. This allows the server to generate some data that can be used to "remember you" when you subsequently come back.

A session cookie is still "just a cookie" but is used to maintain "state of the session". For example, imagine a shopping cart. If you place items in your cart, the server will send back a cookie value that is a key used to find your cart again. If you place items in your cart today and come back tomorrow, the server can use the cookie value to lookup your cart.

As for "ending a session" ... this can be done at the browser by asking the browser to "forget" the cookie such that when you subsequently visit the web site, there is no cookie and hence it has no knowledge of your past interactions. Alternatively, the server can choose to ignore any cookie value you sent. A cookie can also have an implicit self deletion value such that if a time has passed, the cookie evaporates. Finally, the server can ask for the cookie value to be replaced / deleted when you next visit it.

Nice tutorial con be found here:

https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm


### We need to install express-session and connect-mongo

```bash
$ npm install express-session connect-mongo
```

### In app.js we need to add this configuration

```js
// app.js
// session configuration
const session = require('express-session');
// session store using mongo
const MongoStore = require('connect-mongo')(session)

const mongoose = require('./db/index');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        saveUninitialized: false,
        //Forces the session to be saved back to the session store, 
        // even if the session was never modified during the request.
        resave: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
)
// end of session configuration
```

### 🚨 As you see in the snippet above we require mongoose to refer to it when we instantiate the MongoStore - so we need to export it in the db config file

```js
// db/index.js

// add this line at the bottom of the file
module.exports = mongoose;
```