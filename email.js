const nodemailer = require('nodemailer');

exports.sendEmail = async (info, next)=>{
    
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 25,
    auth: {
        user: 'annabel.lebsack@ethereal.email',
        pass: 'ThTEzPAmGSJGRX25kp'
    }
});
console.log(info);
await transporter.sendMail({
    from: info.from,
    to: 'annabel.lebsack@ethereal.email',
    subject: info.subject,
    text: info.message
});
//next();

}

//module.exports = sendEmail