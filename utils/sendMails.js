const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async () => {
  let testAccount = await nodemailer.createTestAccount();
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER_EMAIL,
      pass: process.env.GMAIL_USER_APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL_USER_EMAIL, // Sender addresss
    to: "raunakgurud2002@gmail.com", // List of recipients
    subject: "Node Mailer", // Subject line
    text: "Hello People!, Welcome to Bacancy!", // Plain text body
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
