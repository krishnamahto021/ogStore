const nodemailer = require("../config/nodemailer");
const ejs = require("ejs");
const path = require("path");

module.exports.verifyUserEmail = async (user) => {
  try {
    let emailHtml = await ejs.renderFile(
      path.join(__dirname, "../views/verifyUserEmail.ejs"),
      { token: user.token }
    );
    const options = {
      from: process.env.EMAIL,
      to: user.email,
      subject: `Verify for Sneaker Exclusives!`,
      html: emailHtml,
    };
    await nodemailer.transporter.sendMail(options);
  } catch (error) {
    console.log(`Error in sending mail ${error}`);
  }
};
