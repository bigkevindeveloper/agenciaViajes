const nodemailer = require('nodemailer');


class emailconfig {
    transporter(){
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'htmlkevinrivera@gmail.com',
                pass: 'kevinrivera1998'
            },
        }, {
                from: '',
                headers: {

                }
            })
    }
}



module.exports = emailconfig;