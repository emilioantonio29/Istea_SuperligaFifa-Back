const axios = require("axios");

class PaymentService {
    constructor() {
        this.tokensMercadoPago = {
            prod: {},
            test: {
                access_token: `${process.env.ACCESS_TOKEN_MP_DEV}`
            }
        };
        this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
    }

    createPaymentMercadoPago = async (email, id) => {

        const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
        console.log(email, "email de usuario pasado")
        console.log("id del user: ", id)
        const items = [
            {
                id: "1234",
                title: "Arancel Admin",
                description: "Admision al servicio de Organizacion de torneos como admin",
                picture_url: "https://digitalhub.fifa.com/m/58223e0c1caa5674/original/FIFA-logo.png",
                category_id: "1234",
                quantity: 1,
                currency_id: "ARS",
                unit_price: 1.5
            }
        ];

        const preferences = {
            items,
            external_reference: id,
            payer: {
                name: "Rodolfo",
                surname: "Arruabarrena",
                // para demo/sandbox usar mail de un usuario comprador de prueba para esa integracion sino falla
                // en prod de MP pasar el parametro email que recibe la funcion, funciona sin problema
                email: email,
                phone: {
                    area_code: "11",
                    number: "22223333"
                },
                address: {
                    zip_code: "1111",
                    street_name: "Calle Falsa",
                    street_number: "123"
                }
            },
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: "amex"
                    }
                ],
                excluded_payment_types: [{ id: "atm" }],
                installments: 1,
                default_installments: 1
            },
            // urls de redireccionamiento
            back_urls: {
                success: `${process.env.BACKEND_URL}/payments/success`
            },
            // url donde recibiremos las notificaciones/webhooks
            notification_url: `${process.env.BACKEND_URL}/payments/webhook`,
            // si la compra es exitosa automaticamente redirige a "success" de back_urls
            auto_return: "approved"
        };

        try {
            const request = await axios.post(url, preferences, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // devolvemos la data que devuelve el POST
            return request.data;
            
        } catch (e) {
            
            throw(e.response.data)
        }
    }
}

//NOTA: TODAS las URLS que usemos tienen que ser reales, 
//si prueban con localhost, va a fallar, al menos la redireccion. Usar un tunnel del puerto en localhost a una url
// -yo use ngrok-

module.exports = {
    PaymentService
}