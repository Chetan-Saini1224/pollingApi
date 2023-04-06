import Products from "../../../models/products.js";

export async function getProducts(req, res) {
  try {
    const products = await Products.find(
      {},
      { updatedAt: 0, createdAt: 0, __v: 0 }
    );
    return res.status(200).json({
      data: {
        products,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
}

export async function createProduct(req, res) {
  try {
    const product = await Products.create(req.body.product);
    return res.status(200).json({
      data: {
        product: req.body.product,
      },
    });
  } catch (err) {
    return res.status(500).json({
      data: {
        message: "Server Error...",
      },
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const doc = await Products.findByIdAndDelete(req.params.id);
    if (doc) {
      return res.status(200).json({
        data: {
          message: "product deleted",
        },
      });
    } else {
      return res.status(200).json({
        data: {
          message: "no product found",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      data: {
        message: "Server Error...",
      },
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, {
      quantity: req.query.number,
    }).select("_id name quantity");
    if (product) {
      product.quantity = req.query.number;
      return res.status(200).json({
        data: {
          product,
          message: "updated successfully",
        },
      });
    } else {
      return res.status(200).json({
        data: {
          message: "no product found",
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {
        message: "Server Error...",
      },
    });
  }
}
