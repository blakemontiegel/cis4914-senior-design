const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID);
console.log("Secret Exists:", !!process.env.AWS_SECRET_ACCESS_KEY);
console.log("Mongo URI:", process.env.MONGO_URI);