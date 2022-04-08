const express = require("express"); 
// const { response } = require("express");
const app = express();
const BodyParser = require("body-parser");
const { queryParser } = require('express-query-parser');

require('dotenv').config();

// import DB connection with dotenv
require('dotenv').config();
const connected = require('./db/connection.js');

connected 
.then(()=>{
    console.log("connected!");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));
});

app.use(express.static('public'));
app.use(express.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true
    })
  )

// import routes
const router = require('./routes/routes.js'); 

// API route
app.use('/api/v1', router);
