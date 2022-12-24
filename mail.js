
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
require('dotenv').config();
const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAINNAME
    }
};


const transporter = nodemailer.createTransport(mailGun(auth));


     const sendMail= (name, email, message)=>{
		 
	 
    const mailOptions = {
        from: email,
        to: 'fuegowebdev@gmail.com', // TODO: the receiver email has to be authorized for the free tier
        subject :  name,
        text : message
    };
	
	  transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)}
        else{
	      console.log("message sent");
		}
    });
	 };

module.exports = sendMail;




