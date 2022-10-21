
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

    webhook(req, res) {
        if (req.method === "POST") {
            let body = "";
            
            console.log(req.query);
            //ejemplo { id: '6215978987', topic: 'merchant_order' }
            
            req.on("data", (chunk) => {
                console.log("CHUNK ES: ", chunk)
                body += chunk.toString();
            });
            req.on("end", () => {
                res.end("ok");
            });
            // if req.body['action'] == "payment.created" ... buscar por merchant_order, data.id 
            //req.body ========================================
                // body: {
                //     action: 'payment.created',
                //     api_version: 'v1',
                //     data: { id: '1309207343' },
                //     date_created: '2022-10-20T20:56:59Z',
                //     id: 103598719214,
                //     live_mode: false,
                //     type: 'payment',
                //     user_id: '1214224897'
                // }
            // if req.body['action'] == "payment.updated" ...
            // falta ver bien como los identificamos y guardamos el tema transacciones
            // mas complejo d elo que pensaba
            console.log(req)
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