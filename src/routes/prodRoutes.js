import express from "express";
import { insertProduct, getProduct, updateProduct, deleteProduct} from "../controllers/prodController.js";

const router = express.Router();
router.post("/insertProduct", insertProduct);
router.get("/:id", getProduct);
router.put("/updateProduct/: id", updateProduct);
router.delete("/deleteProduct: id/", deleteProduct);

export default router