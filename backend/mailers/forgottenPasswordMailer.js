const nodemailer = require("../config/nodemailer");
const ejs = require("ejs");
const path = require("path");

module.exports.forgottenPasswordEmail = async (user) => {
  try {
    let emailHtml = await ejs.renderFile(
      path.join(__dirname, "../views/forgottenPasswordEmail.ejs"),
      { token: user.token }
    );
    const options = {
      from: process.env.EMAIL,
      to: user.email,
      subject: `Reset your Password`,
      html: emailHtml,
    };
    await nodemailer.transporter.sendMail(options);
  } catch (error) {
    console.log(`Error in sending mail ${error}`);
  }
};
