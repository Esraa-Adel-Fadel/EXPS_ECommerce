import { Request, Router } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { restrictToAdmin } from "../middleware/roleMiddleware.js";

const router=Router();

router.get("/profile" , verifyJWT ,(req , res )=>{
    return res.status(200).json({
        message: `Welcome to your profile!`,
        user: req.user,
    });
});
router.get("/admin-dashboard" , verifyJWT ,restrictToAdmin ,(req , res )=>{
    return res.status(200).json({
        message: `Welcome Boss! This is the admin dashboard.`,
    });
});

export default router;