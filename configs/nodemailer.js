const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER_EMAIL,
    pass: process.env.GMAIL_USER_APP_PASSWORD,
  },
};

module.exports = nodemailerConfig;
