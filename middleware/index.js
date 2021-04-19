// All middlewares go here

let middlewareObj = {};

// Middleware Logic
middlewareObj.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/api/user/login");
  } else {
    next();
  }
}

middlewareObj.checkRole = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/api/user/login");
  } else if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      next();
    } else {
      req.flash("error", "You must have ADMIN privilege to do that");
      res.redirect("/api/menus");
    }
  }
}

module.exports = middlewareObj;
