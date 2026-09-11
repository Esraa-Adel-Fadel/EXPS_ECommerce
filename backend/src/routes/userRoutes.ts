import { Request, Router,Response } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { restrictToAdmin } from "../middleware/roleMiddleware.js";
import prisma from "../config/db.js";

const router=Router();

router.get("/profile", verifyJWT, async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)?.id || (req.user as any)?.userId || (req.user as any)?.sub;
    const userEmail = (req.user as any)?.email;

    if (!userId && !userEmail) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: User payload is missing or invalid",
      });
    }

    const user = await prisma.user.findUnique({
      where: userId ? { id: userId } : { email: userEmail },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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