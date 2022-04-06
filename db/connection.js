require('dotenv').config();
const mongoose = require("mongoose");

let mongoDB = process.env.DB_CONNECTION;
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = mongoose.connect(mongoDB);
