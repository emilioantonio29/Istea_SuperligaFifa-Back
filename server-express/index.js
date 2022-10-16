require('dotenv').config();
const express = require("express");
const app = express(); 
const {routerUsers} = require('./src/1-routes/users/routeUsers');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// DIRECT ENDPOINTS
app.get('/', (req,res)=>{
  res.json({
    project: "Proyecto ISTEA - Backend: Integracion de Sistemas"
  });
});

// ROUTERS
app.use('/users', routerUsers());

// SERVER 
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started on port 5000');
});

module.exports = app;