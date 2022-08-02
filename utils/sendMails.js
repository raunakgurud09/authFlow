const nodemailer = require("nodemailer");

const sendMail = async () => {
  let testAccount = await nodemailer.createTestAccount();
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "raunakgurud09@gmail.com",
      pass: "bnfbarujvesodqvu",
      //bnfbarujvesodqvu
    },
  });
  const mailOptions = {
    from: "raunakgurud09@gmail.com", // Sender address
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
