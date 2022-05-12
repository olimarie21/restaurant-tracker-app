const express = require("express"); 
const cors = require('cors');
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

app.use(cors());
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
