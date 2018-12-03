const emailconfig = require('../config/emailConfig');

class emailservice {
    constructor() {
        this.email = new emailconfig();
    }

    enviarEmailRegistro(datos) {
        new Promise((res, rej) => {
            let mensaje = {
                to: datos.PostEmail,
                subject: 'Bienvenido a GEEKHUBS TRAVELS',
                html: `<p style="color="red"><b>Registrado correctamente:<br>Haga click en el enlace para confirmar su cuenta:
                        <a href="http://localhost:3000/activate/${datos.PostHash}">Registrame</a></b></p>`
            }
            this.email.transporter().sendMail(mensaje, (error, info) => {
                if (error) return rej(error);
                this.email.transporter().close();
                return res("Email enviado");
            });
        });
    }
}
/*Correcion*/ 

module.exports = emailservice;