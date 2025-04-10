require("dotenv").config();
require("colors"); 
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const SERVER_ADDRESS = process.env.SERVER_ADDRESS
const SERVER_PORT = process.env.SERVER_PORT || 6000;
const PORT = process.env.VITE_PORT || 3000;

function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "postgres:///pt_render_test"
    : process.env.DATABASE_URL;
    // : process.env.DATABASE_URL || "postgres:///pt_render";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("PortTracker Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("SERVER_ADDRESS:".yellow, SERVER_ADDRESS.toString());
console.log("SERVER_PORT:".yellow, SERVER_PORT.toString());
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  SERVER_ADDRESS,
  SERVER_PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri
};
