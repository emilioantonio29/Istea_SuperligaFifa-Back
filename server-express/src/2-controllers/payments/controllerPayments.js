const { json } = require("express");
const axios = require("axios");
const { userUpdateDB, getUserDB } = require("../../4-DAOs/mongoDB/dao/user");



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

                let payment_id = req.body['data']['id']
                
                console.log("Se recibio notificacion de Pago con ID:", payment_id)

                //chequeo y confirmo si pago se realizó
                const payment_found = await this.getPaymentConfirmation(payment_id)

                // Acá se busca el usuario con el email asignado al pago y se actualiza el campo 'admin' a True
                if (payment_found.status == "approved" && payment_found.status_detail == "accredited"){
    
                    // solo para demo ---ANTES del Usuario
                    let user_before_payment = await getUserDB({username: payment_found.payer.email});
                    console.log("el email de usuario buscado en nuestra BBDD: ", payment_found.payer.email)
                    console.log("user_before_payment", user_before_payment)
                    console.log()
    
                    let filterObject = {username: payment_found.payer.email};
                    let updateObject = {
                        admin: true
                    };
    
                    await userUpdateDB(filterObject, updateObject);
                    
                    // solo para demo ---DESPUES del Usuario
                    let user_after_payment = await getUserDB({username: payment_found.payer.email});
                    console.log("user_after_payment", user_after_payment)
                    console.log()
                }
                                


            }   else {
                console.log("Merchant Order")
                console.log(req.query)
                console.log()
            }

        }
        res.sendStatus(200);
        
    }

    static getPaymentSuccess = (req, res) =>{
        res.redirect("https://superligafifa.herokuapp.com/");
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