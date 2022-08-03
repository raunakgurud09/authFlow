const nodemailer = require("nodemailer");
const nodemailerConfig = require("../configs/nodemailer");
require("dotenv").config();

const sendMail = async () => {
  // let testAccount = await nodemailer.createTestAccount();
  let transport = nodemailer.createTransport(nodemailerConfig);
  const mailOptions = {
    from: process.env.GMAIL_USER_EMAIL, // Sender addresss
    to: "raunakgurud2002@gmail.com", // List of recipients
    subject: "Node Mailer", // Subject line
    text: "Hello People!, Welcome to Bacancy!", // Plain text body
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
