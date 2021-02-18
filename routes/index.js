const router = require("express").Router();

// middleware to check if the user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    // if user is logged in proceed to the next step
    if (req.session.user) {
      next();
    } else {
      // otherwise redirect to /login
      res.redirect('/login', { style: 'login.css' });
    }
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.user;
  res.render("index", { user: user, style: 'index.css' });
});

// protected route - can only be accessed by a logged in user
router.get('/profile', loginCheck(), (req, res) => {
  res.redirect('/books');
})

module.exports = router;
