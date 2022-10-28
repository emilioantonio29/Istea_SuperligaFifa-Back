const { json } = require("express");
const axios = require("axios");



class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    getMercadoPagoLink = async (req, res) => {
        const { email } = req.body;
        try {
            const checkout = await this.paymentService.createPaymentMercadoPago(
                email
            );

            return res.json(checkout.init_point);

        } catch (err) {


            return res.status(500).json({
                error: true,
                msg: "Hubo un error con Mercado Pago",
                qpaso: err
            });
        }
    }

    getPaymentConfirmation = async (payment_id) => {
        try {
            const resp = await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, {
                headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.ACCESS_TOKEN_MP_DEV}`
                        }
            });

            return resp.data
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    async webhook(req, res) {
        if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
                console.log("CHUNK ES: ", chunk)
                body += chunk.toString();
            });
            req.on("end", () => {
                res.end("ok");
            });
            if ('type' in req.query && req.query['type'] == "payment") {
                console.log("Webhook recibido...")
                console.log()

                let payment_id = req.body['data']['id']
                
                console.log("Se recibio notificacion de Pago con ID:")
                console.log(payment_id)
                console.log()

                //chequeo y confirmo si pago se realizó
                const payment_found = await this.getPaymentConfirmation(payment_id)

                // Acá se busca el usuario con el email asignado al pago y se actualiza el campo 'admin' a True
                // Accedo diretamente a DAO?? O armo un servicio para ello?
                // Ver a quien y de donde llamo para hacer este update del user?
                // if (payment_status == "approved" && transaction_detail == "accredited"){
                //     let data = await updateAdminUserDB(payer.email)
                //     console.log(data)
                // }

                //

                console.log("Payment ID encontrado: ...")
                console.log(payment_found.id)
                console.log()
                console.log("Para el usuario con email: ...")
                console.log(payment_found.payer.email)
                console.log()
                console.log("Payment status: ...")
                console.log(payment_found.status)
                console.log()
                console.log("Payment transaction detail: ...")
                console.log(payment_found.status_detail)
                
                


            }   else {
                console.log("Merchant Order")
                console.log(req.query)
                console.log()
            }

        }
        res.sendStatus(200);
        
    }

    static getPaymentSuccess = (req, res) =>{
        res.status(200).json({welcome: "PAGO EXITOSO - PAYMENT CONTROLLER"});      
    }

    static getPaymentError = (req, res) =>{
        res.status(200).json({welcome: "HUBO UN ERROR EN EL PAGO - PAYMENT CONTROLLER"});      
    }

    static getPaymentPending = (req, res) =>{
        res.status(200).json({welcome: "PAGO EN ESTADO PENDIENTE - PAYMENT CONTROLLER"});      
    }
}

module.exports = {
    PaymentController
}