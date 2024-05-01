const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const env = require("./getEnv");

class loginController {
  async signIn(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    await userModel
      .find({ username: username, password: password })
      .then((result) => {
        result == ""
          ? res.json(false)
          : res.json({
              id: result[0]._id,
              username: result[0].username,
              password: result[0].password,
            });
      })
      .catch((err) => console.log(err));
  }
  async signUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const fullname = req.body.fullname;
    const phone = req.body.phone;

    await userModel
      .find({ username: username })
      .then(async (result) => {
        if (result.length == 1) {
          res.json(-1);
        } else {
          await userModel
            .insertMany({
              username: username,
              email: email,
              fullname: fullname,
              phone: phone,
              password: password,
              avatar: "https://i.ytimg.com/vi/vUH6PnbL4-c/maxresdefault.jpg",
            })
            .then(async (result) => {
              res.json(result.length);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  encryptionLogin(req, res) {
    const token = jwt.sign(req.body, env.getKeyJwt());
    res.json(token);
  }
  decryptionLogin(req, res) {
    const token = req.body.headers.Authorization;
    const result = jwt.verify(token, env.getKeyJwt());
    res.json(result);
  }
}
module.exports = new loginController();
