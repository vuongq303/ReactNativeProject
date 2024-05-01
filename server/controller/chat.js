const userModel = require("../model/user");
const chatModel = require("../model/chat");
const textChatModel = require("../model/textChat");

class chatController {
  async getAllUser(req, res) {
    const { id } = req.query;
    await userModel
      .find({})
      .then((result) => {
        const filter = result.filter((val, i) => val._id != id);
        var data = [];
        filter.forEach((e) => {
          data.push({
            _id: e._id,
            avatar: e.avatar,
            fullname: e.fullname,
            lastChat: e.lastChat,
          });
        });
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getUser(req, res) {
    const { id } = req.query;
    await userModel
      .find({ _id: id })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async setUser(req, res) {
    const arr = req.body;
    await chatModel
      .find({ listUser: arr })
      .then(async (result) => {
        if (result == "") {
          await chatModel
            .insertMany({ listUser: arr })
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getUserArr(req, res) {
    const arr = req.body;
    await chatModel
      .find({ listUser: arr })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async setSkeleton(req, res) {
    const { id, messages } = req.body;
    await textChatModel
      .insertMany({ _id: id, messages: messages })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async sendMessage(req, res) {
    const { id, messages } = req.body;
    console.log(id);
    await textChatModel
      .findByIdAndUpdate(
        id,
        {
          $push: {
            message: messages,
          },
        },
        { upsert: true, new: true }
      )
      .exec()
      .then((result) => {
        res.json(result.message[result.message.length - 1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getMessage(req, res) {
    const { id } = req.query;
    await textChatModel
      .find({ _id: id })
      .then((result) => {
        result.length == 0
          ? res.send("0")
          : res.send(result[0].message.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async lastMessage(req, res) {
    const { id, text, date } = req.body;
    await chatModel
      .findByIdAndUpdate(id, {
        $set: {
          lastChat: {
            text: text,
            date: date,
          },
        },
      })
      .then((result) => {
        res.json(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new chatController();
