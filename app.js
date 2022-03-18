const express = require("express"); 
const app = express();

// import DB connection with dotenv
require('dotenv').config();
const connected = require('./db/connection.js');

// connect to server
connected 
.then(()=>{
    console.log("connected!");
    const server = app.listen(8080, ()=>console.log("Listening"));
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// import routes
const router = require('./routes/restaurants'); 

// API route
app.use('/api/v1', router);