require('dotenv').config();
const express = require("express");
var cors = require('cors')
const app = express(); 
const {routerUsers} = require('./src/1-routes/users/routeUsers');
const {routerPayments} = require('./src/1-routes/payments/routePayments'); 
const { routerTournaments } = require('./src/1-routes/tournaments/routeTournaments');
const { routerTesting } = require('./src/1-routes/testing/testing')

// MIDDLEWARES
app.use(cors())
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

// PAYMENT ROUTERS
app.use('/payments', routerPayments())

// TOURNAMENTS ROUTERS
app.use('/tournaments', routerTournaments())

// TESTING
app.use('/testing', routerTesting());

// SERVER 
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started on port 5000');
});

module.exports = app;