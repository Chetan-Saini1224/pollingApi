import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../controllers/api/v1/productscontroller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/create", createProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/update_quantity/", updateProduct);

export default router;
