"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */
// CAPSTONE 2 - COMPLETE - (on all routes) if token provided then store payload
// on res.locals for use
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */
// CAPSTONE 2 - COMPLETE - use for AUTH LVL 1 - just LOGGED IN - important
function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    console.log("live, from inside ensureloggedin", res.locals.user);
    return next();
  } catch (err) {
    return next(err);
  }
}

// DELETE THIS ******************************
/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

// function ensureAdmin(req, res, next) {
//   try {
//     if (!res.locals.user || !res.locals.user.isAdmin) {
//       throw new UnauthorizedError();
//     }
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */
// CAPSTONE 2 - COMPLETE - use for AUTH LVL 2 - just LOGGED IN - important
function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;
    console.log("starting to loggin ", user, "req.param", req.params.username);
    if (!(user && (user.username === req.params.username))) {
      throw new UnauthorizedError();
    }
    console.log("correctly auth match user to: ", user);
    return next();
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
};
