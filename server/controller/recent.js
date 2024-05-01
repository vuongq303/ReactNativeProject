const recentModel = require("../model/recent");
class recent {
  async addRecent(req, res) {
    const { idUser, id, name, img, price, sold, rate } = req.body;
    await recentModel
      .find({ "recently.idProduct": id, idUser: idUser })
      .then(async (result) => {
        if (result.length == 0) {
          await recentModel
            .findOneAndUpdate(
              { idUser: idUser },
              {
                $push: {
                  recently: [
                    {
                      idProduct: id,
                      nameProduct: name,
                      imgProduct: img,
                      nameProduct: name,
                      price: price,
                      sold: sold,
                      rate: rate,
                    },
                  ],
                },
              },
              { upsert: true, new: true }
            )
            .then((result) => {
              res.json(result.recently[result.recently.length - 1]);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async removeRecent(req, res) {
    const id = req.body.id;
    await recentModel
      .findOneAndUpdate(
        {
          idUser: id,
        },
        {
          $set: {
            recently: [],
          },
        }
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getRecent(req, res) {
    const id = req.query.id;
    await recentModel
      .find({ idUser: id })
      .then((result) => {
        let arr = result.map((e) => e.recently);
        res.send(...arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new recent();
