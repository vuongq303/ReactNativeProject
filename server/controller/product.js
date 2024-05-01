const productModel = require("../model/product");
class productController {
  async getProducts(req, res) {
    await productModel
      .find({})
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }
  async getItemProduct(req, res) {
    const id = req.body.itemId;
    await productModel
      .find({ _id: id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  }
}
module.exports = new productController();
