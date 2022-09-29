const nodemailer = require("nodemailer");
const nodemailerConfig = require("../configs/nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
const path = require("path");
require("dotenv").config();

const sendVerificationMail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const filePath = path.join(__dirname, "../public/sendEmail.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);

  const replacements = {
    name,
    verifyEmail,
  };

  const htmlToSend = template(replacements);

  let transporter = nodemailer.createTransport(nodemailerConfig);

  const mailOptions = {
    from: process.env.GMAIL_USER_EMAIL,
    to: email,
    subject: "Verify your email",
    text: `Hello ${name}
    This is to verify your email click on the link 
    ${verifyEmail}`,
    html: htmlToSend,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
  //   console.log("Message sent: %s", info.messageId);
  //   console.log("Preview URL: %s", "https://mailtrap.io/inboxes/test/messages/");
};

module.exports = sendVerificationMail;
