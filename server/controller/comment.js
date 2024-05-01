const comments = require("../model/comment");
const users = require("../model/user");
class comment {
  async addComment(req, res) {
    const { idUser, idProduct, text } = req.body;
    try {
      let resultUser = await users.findById(idUser);
      let resultComment = await comments.findOneAndUpdate(
        { idProduct: idProduct },
        {
          $push: {
            comment: {
              idUser: idUser,
              name: resultUser.fullname,
              img: resultUser.avatar,
              text: text,
            },
          },
        },
        { upsert: true, new: true }
      );
      res.json(resultComment.comment[resultComment.comment.length - 1]);
    } catch (error) {
      console.log(error);
    }
  }

  async getComment(req, res) {
    const { idProduct } = req.query;
    try {
      let result = await comments.find({ idProduct: idProduct });

      res.send(result.length != 0 ? result[0].comment : []);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new comment();
