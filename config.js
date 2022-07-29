"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
// TODO - figure out secure way to store this later
// ADD TO ENV FILE
const API_KEY = "704JX6R8XZ4B8SKY7KWKWA1HVG5M"
const BASE_EXT_API = "https://beta3.api.climatiq.io"

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "dev_carbon_test"
      : process.env.DATABASE_URL || "dev_carbon";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  API_KEY,
  BASE_EXT_API,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
