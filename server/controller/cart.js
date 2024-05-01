const productModel = require("../model/product");
const cartModel = require("../model/cart");

class cart {
  async addToCart(req, res) {
    const idUser = req.body.idUser;
    const id = req.body.id;
    const img = req.body.img;
    const name = req.body.name;
    const price = req.body.price;
    const size = req.body.size;
    await cartModel
      .find({ "cart.idProduct": id, idUser: idUser })
      .then(async (result) => {
        if (result.length != 1) {
          await cartModel
            .findOneAndUpdate(
              { idUser: idUser },
              {
                $push: {
                  cart: [
                    {
                      idProduct: id,
                      imgProduct: img,
                      nameProduct: name,
                      price: price,
                      size: size,
                    },
                  ],
                },
              },
              { upsert: true }
            )
            .then((result) => {
              res.json(1);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json("0");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getProductCart(req, res) {
    const id = req.body.id_;
    await cartModel
      .find({ idUser: id })
      .then((result) => {
        const cart = result.map((val, i) => val.cart);
        res.json(cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async removeProductCart(req, res) {
    const idUser = req.body.pop().idUser;
    const data = req.body;
    var matchCount = 0;
    for (const e of data) {
      try {
        const responsive = await cartModel.updateMany(
          { idUser: idUser },
          {
            $pull: {
              cart: {
                idProduct: e.id,
              },
            },
          }
        );
        matchCount += responsive.matchedCount;
      } catch (error) {
        console.log(error);
      }
    }
    res.json(matchCount);
  }

  async getProductId(req, res) {
    const id = req.body.id;
    await productModel
      .find({ _id: id })
      .then(async (result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateProductToCart(req, res) {
    const idUser = req.body.idUser;
    const idProduct = req.body.id;
    const price = req.body.price;
    const name = req.body.name;
    const img = req.body.image;
    const size = req.body.size;
    await cartModel
      .updateMany(
        { idUser: idUser, "cart.idProduct": idProduct },
        {
          $set: {
            "cart.$": {
              idProduct: idProduct,
              nameProduct: name,
              imgProduct: img,
              price: price,
              size: size,
            },
          },
        }
      )
      .then((result) => {
        res.json(result.matchedCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new cart();
