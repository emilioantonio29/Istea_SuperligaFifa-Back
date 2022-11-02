const registerConfirmationTemplate = async (name, url) => {

    let template = await `<html>
                            <body>
                                <div style='margin:0;padding:0;'>
                                    <table role='presentation'
                                        style='width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;'>
                                        <tr>
                                            <td align='center' style='padding:0;'>
                                                <table role='presentation' style='width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;'>
                                                    <tr>
                                                        <td align='center' style='padding-top:15px;background:#ffffff;'>
                                                            <h1><a style="text-decoration: none; color: rgb(184, 140, 184);" href="https://superligafifa.herokuapp.com/">Superlifa Fifa</a></h1>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align='center' style='padding:0px;background:ffffff;'>
                                                            <img src="https://superligafifa.herokuapp.com/static/media/neymar.9c774dff6706e39af265.jpg" alt="" style="width: 100%; height: auto; margin: auto; display: block;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style='padding:36px 30px 42px 30px;'>
                                                            <table role='presentation'
                                                                style='width:100%;border-collapse:collapse;border:0;border-spacing:0;'>
                                                                <tr>
                                                                    <td style='padding:0 0 0px 0;color:#153643;'>
                                                                        <h2 style="text-align: center;">Gracias por verificar tu cuenta</h2>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style='padding:0;'>
                                                                        <table role='presentation'
                                                                            style='width:100%;border-collapse:collapse;border:0;border-spacing:0;'>
                                                                            <tr>
                                                                                <td style='width:260px;padding:0;vertical-align:top;color:#153643;'>
                                                                                    <p style='margin:0 0 12px 0;font-size:16px;line-height:22px;font-family:Arial,sans-serif;'>
                                                                                        Hola ${name}, ya puedes iniciar sesión en nuestro portal:
                                                                                    </p>
                                                                                    <p style="text-align: center;">
                                                                                        <a style="text-decoration: none; color: rgb(142, 96, 142); text-align: center;" href="${url}" 
                                                                                        class="btn btn-primary">Superliga Fifa</a>
                                                                                    </p>
                                                                                </td>
                                                                                <td style='width:20px;padding:0;font-size:0;line-height:0;'>&nbsp;</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style='padding:30px;background:rgb(184, 140, 184);'>
                                                            <table role='presentation'
                                                                style='width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;'>
                                                                <tr>
                                                                    <td style='padding:0;width:100%;' align='center'>
                                                                        <table role='presentation'
                                                                            style='border-collapse:collapse;border:0;border-spacing:0;'>
                                                                            <tr>
                                                                                <td class="bg_light" style="text-align: center;">
                                                                                    <p style="color: white">Powered by Superliga Fifa<a href="#"
                                                                                            style="color: rgba(255, 255, 255, 0.8);"></a></p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>            
                            </body>
                        </html>`

    return template;

}


module.exports = {registerConfirmationTemplate}
