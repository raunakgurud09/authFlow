const nodemailer = require("nodemailer");
const nodemailerConfig = require("../configs/nodemailer");
require("dotenv").config();

const sendMail = async (email, otp) => {
  // let testAccount = await nodemailer.createTestAccount();
  let transport = nodemailer.createTransport(nodemailerConfig);
  const mailOptions = {
    from: process.env.GMAIL_USER_EMAIL, // Sender addresss
    to: email, // List of recipients
    subject: "Reset your password", // Subject line
    text: `Your OTP is ${otp}`, // Plain text body
  };

  await transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
