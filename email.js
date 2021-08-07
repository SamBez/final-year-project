const nodemailer = require('nodemailer');

exports.sendEmail = async (info)=>{
    
const transporter = nodemailer.createTransport({
    host: 'stmp.ethereal.email',
    port: 25,
    auth: {
        user: 'annabel.lebsack@ethereal.email',
        pass: 'ThTEzPAmGSJGRX25kp'
    }
});

await transporter.sendMail({
    from: 'gonesam77@gmail.com',
    to: info.email,
    subject: info.subject,
    text: info.message
});


}

//module.exports = sendEmail