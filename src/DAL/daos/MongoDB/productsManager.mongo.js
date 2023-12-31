import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
  async findAggre() {
    const result = await productsModel.aggregate([
      {
        $match: { stock: { $gt: 5 } },
      },
      { $sort: { stock: 1 } },
      { $limit: 2 },
    ]);
    return result;
  }

  async findAll(obj) {
    const { limit = 10, page = 1, sort = "asc", ...filter } = obj;
    const sortBy = {
      def: { title: -1 },
      asc: { price: 1 },
      desc: { price: -1 },
    };
    const result = await productsModel.paginate(filter, {
      limit,
      page,
      sort: sortBy[sort],
    });
    const leanResult = result.docs.map((doc) =>
      doc.toObject({ virtuals: true })
    );
    const info = {
      status: result.docs ? true : false,
      payload: result.totalDocs,
      totalPages: result.totalPages,
      prevPage: result.prevPage ? result.prevPage : page,
      nextPage: result.nextPage ? result.nextPage : page,
      page: result.page,
      hasPrevPage: result.prevPage ? true : false,
      hasNextPage: result.nextPage ? true : false,
      prevLink: result.hasPrevPage
        ? `http://localhost:8080/api/views/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `http://localhost:8080/api/views/products?page=${result.nextPage}`
        : null,
    };
    const results = leanResult;
    return { info, results };
  }

  async findById(id) {
    const result = await productsModel.findById(id);
    return result;
  }
  async createOne(obj) {
    const result = await productsModel.create(obj);
    return result;
  }
  async updateOne(id, obj) {
    const result = await productsModel.updateOne({ _id: id }, obj);
    return result;
  }
  async deleteOne(id) {
    const result = await productsModel.deleteOne({ _id: id });
    return result;
  }
}

export const productsManager = new ProductsManager();
