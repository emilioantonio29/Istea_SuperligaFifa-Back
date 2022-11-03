const nodemailer = require("nodemailer");
const { registerTemplate } = require("./templates/register");
const { registerConfirmationTemplate } = require("./templates/registerconfirmation");
const { passwordRecoveryTemplate } = require("./templates/passwordrecovery")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'lasuperligafifa@gmail.com',
        pass: process.env.MAILING_PASSWORD
    }
});

const mailRegister = async (username, name, url) =>{

    let template = await registerTemplate(name, url)

    const mailOptions = {
        from: 'Superliga FIFA',
        to: `${username}`,
        subject: 'Superliga FIFA - Registro completado con éxito',
        html: template
    }

    transporter.sendMail(mailOptions)
        .then((data)=>{
            console.log(data)
            // res.status(200).json(data);
            // return 200;
        }).catch((err)=>{
            // res.status(500).send(err.message)
            console.log(err.message)
            // return 500;
        })
}

const mailRegisterConfirmation = async (username, name, url) =>{

    let template = await registerConfirmationTemplate(name, url)

    const mailOptions = {
        from: 'Superliga FIFA',
        to: `${username}`,
        subject: 'Superliga FIFA - Cuenta verificada con éxito',
        html: template
    }

    transporter.sendMail(mailOptions)
        .then((data)=>{
            console.log(data)
            // res.status(200).json(data);
            // return 200;
        }).catch((err)=>{
            // res.status(500).send(err.message)
            console.log(err.message)
            // return 500;
        })
}

const mailPasswordRecovery = async (username, name, url) =>{

    let template = await passwordRecoveryTemplate(name, url)

    const mailOptions = {
        from: 'Superliga FIFA',
        to: `${username}`,
        subject: 'Superliga FIFA - Solicitud de cambio de contraseña',
        html: template
    }

    transporter.sendMail(mailOptions)
        .then((data)=>{
            console.log(data)
            // res.status(200).json(data);
            // return 200;
        }).catch((err)=>{
            // res.status(500).send(err.message)
            console.log(err.message)
            // return 500;
        })
}

module.exports = {mailRegister, mailRegisterConfirmation, mailPasswordRecovery}
