const express = require("express");
const app = express();

require('dotenv').config();
const connected = require('./db/connection.js');

connected 
.then(()=>{
    console.log("connected!");
    const server = app.listen(8080, ()=>console.log("Listening"));
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = require('./routes/restaurants'); 

app.use('/api/v1', router);