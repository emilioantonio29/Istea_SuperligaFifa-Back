const express = require('express');
const { PaymentController } = require('../../2-controllers/payments/controllerPayments');
const {PaymentService} = require('../../3-services/payments/servicePayments');

// LAYER 1: ROUTES - PAYMENTS
const routerPayments = () =>{

  const routerApi = express.Router();
  

  routerApi.get('/success', PaymentController.getPaymentSuccess)
  routerApi.get('/error', PaymentController.getPaymentError)
  routerApi.get('/pending', PaymentController.getPaymentPending)

  // No lo pude hacer con metodos estaticos como las otrasrutas; MP me tiraba unos errores sin mucho detalle.
  // Necesité instanciar el controller y el servicio aca y pasarles el request.
  const PaymentInstance = new PaymentController(new PaymentService());
  routerApi.post('/new', (req, res) => PaymentInstance.getMercadoPagoLink(req, res));
  routerApi.post('/webhook', (req, res) => PaymentInstance.webhook(req, res));

  return routerApi;

}

module.exports ={
    routerPayments
}