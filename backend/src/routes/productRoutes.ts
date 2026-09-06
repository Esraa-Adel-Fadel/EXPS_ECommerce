import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { restrictToAdmin } from "../middleware/roleMiddleware.js";

const router = Router();
router.get("/" , productController.getAll);
router.get("/:id" , productController.getOne);
router.post("/", verifyJWT , restrictToAdmin , productController.create);
router.patch("/:id", verifyJWT , restrictToAdmin , productController.update);
router.delete("/:id", verifyJWT , restrictToAdmin , productController.delete);

export default router;
