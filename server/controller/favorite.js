const favoriteModel = require("../model/favorite");
class favorite {
  async addToFavorite(req, res) {
    const { idUser, id, name, img, price, sold, rate } = req.body;
    await favoriteModel
      .find({ "favorite.idProduct": id, idUser: idUser })
      .then(async (result) => {
        if (result.length != 1) {
          await favoriteModel
            .findOneAndUpdate(
              { idUser: idUser },
              {
                $push: {
                  favorite: [
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
              res.json(result.favorite[result.favorite.length - 1]);
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
  async getProductFavorite(req, res) {
    const { id } = req.query;
    await favoriteModel
      .find({ idUser: id })
      .then((result) => {
        const favorite = result.map((val) => val.favorite);
        res.send(favorite[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async removeFromFavorite(req, res) {
    const { idProduct, idUser } = req.body;
    try {
      const responsive = await favoriteModel.updateMany(
        { idUser: idUser },
        {
          $pull: {
            favorite: {
              idProduct: idProduct,
            },
          },
        }
      );
      res.json(responsive.matchedCount);
    } catch (error) {
      console.log(error);
    }
  }

  async checkInFavorite(req, res) {
    const { idProduct, idUser } = req.body;
    await favoriteModel
      .find({
        idUser: idUser,
        "favorite.idProduct": idProduct,
      })
      .then((result) => {
        result.length == 0 ? res.json(0) : res.json(1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new favorite();
