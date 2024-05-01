function generateRandomString(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

const nodemailer = require("nodemailer");
const userModel = require("../model/user");

class password {
  async createOtp(req, res) {
    const { to } = req.body;
    const result = generateRandomString(8);
    console.log("Otp: " + result);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vuongq303@gmail.com",
        pass: "ikpr kqwo kgzi musz",
      },
    });

    var mailOptions = {
      from: "vuongq303@gmail.com",
      to: to,
      subject: "Reset password",
      text: "Your authentication code is\n" + `${result}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(result);
  }
  async findEmail(req, res) {
    await userModel
      .find({ email: req.body.email })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updatePassword(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    await userModel
      .updateOne({ email: email }, { $set: { password: password } })
      .then((result) => {
        res.json(result.matchedCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new password();
