import { Router } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { categoryController } from "../controllers/categoryController.js";
import { restrictToAdmin } from "../middleware/roleMiddleware.js";

export const router=Router();

router.get('/' , categoryController.getAll);
router.get('/:id' , categoryController.getOne);
router.post('/', verifyJWT ,restrictToAdmin , categoryController.create);
router.patch('/:id' ,verifyJWT ,restrictToAdmin , categoryController.update);
router.delete('/:id' , verifyJWT ,restrictToAdmin , categoryController.delete);

export default router;