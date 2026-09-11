import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { restrictToAdmin } from "../middleware/roleMiddleware.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", orderController.createOrder);
router.get("/my-orders", orderController.getMyOrders);

router.get("/admin/all", restrictToAdmin, orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);
router.patch("/:id/status", restrictToAdmin, orderController.updateOrderStatus);

export default router;