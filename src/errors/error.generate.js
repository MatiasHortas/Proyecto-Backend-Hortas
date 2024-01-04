export class CartNotFound {
  static generateError() {
    const error = new Error("Cart not found");
    error.code = 404;
    error.name = "CART_NOT_FOUND";
    throw error;
  }
}

export class IdNotFound {
  static generateError() {
    const error = new Error();
    error.message = "Id not found";
    error.code = 404;
    error.name = "ID_NOT_FOUND";
    throw error;
  }
}
export class ValidationError {
  static generateError() {
    const error = new Error();
    error.message = "Invalid data";
    error.code = 404;
    error.name = "VALIDATION_ERROR";
    throw error;
  }
}

export class ProductNotFound {
  static generateError() {
    const error = new Error("Product not found");
    error.code = 404;
    error.name = "PRODUCT_NOT_FOUND";
    throw error;
  }
}
