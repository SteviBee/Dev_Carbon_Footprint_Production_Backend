"use strict";

/** Express app for dev-carbon-footprint. */

const express = require("express");
const cors = require("cors");

// Setting up required imports & routes
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const calcRoutes = require("./routes/calc");


// DELETE THIS ******************************
// const companiesRoutes = require("./routes/companies");
// const jobsRoutes = require("./routes/jobs");
// 8/29 - Will review / redo soon.
// 10/6 - will comeback and clean up soon

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Setting Routes
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/calc", calcRoutes);

// DELETE THIS ******************************?
// app.use("/companies", companiesRoutes);
// app.use("/jobs", jobsRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
