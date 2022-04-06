const express = require("express"); 
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
    app.listen(8080, ()=>console.log("Listening"));
});

app.use(express.static('public'));
app.use(BodyParser.json());
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
const router = require('./routes/restaurants'); 

// API route
app.use('/api/v1', router);
