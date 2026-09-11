import { Request, Router,Response } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { restrictToAdmin } from "../middleware/roleMiddleware.js";
import prisma from "../config/db.js";

const router=Router();

router.get("/profile" , verifyJWT ,(req : Request, res : Response )=>{
    return res.status(200).json({
        message: `Welcome to your profile!`,
        user: req.user,
    });
});
router.get("/admin-dashboard" , verifyJWT ,restrictToAdmin ,(req: Request , res : Response )=>{
    return res.status(200).json({
        message: `Welcome Boss! This is the admin dashboard.`,
    });
});
router.get("/admin/users", verifyJWT, restrictToAdmin, async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
  
      return res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch users",
      });
    }
  });

export default router;