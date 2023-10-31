import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async findAll() {
    const result = await cartsModel.find();
    return result;
  }
  async findById(idCart) {
    const result = await cartsModel
      .findById(idCart)
      .populate("products.product");
    return result;
  }
  async createOne() {
    const newCart = { products: [] };
    const result = await cartsModel.create(newCart);
    return result;
  }

  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);
    const productIndex = cart.products.findIndex((p) =>
      p.product.equals(idProduct)
    );
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }

    await cart.save();
  }

  async updateOne(cid, pid) {
    const result = await cartsModel.createIndexes({ _id: id }, pid);
    return result;
  }
  async deteleAll() {
    const result = await cartsModel.deleteMany({});
    return result;
  }
}

export const cartsManager = new CartsManager();
