import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxcount:1
    },
    {
        name:"coverImg",
        maxcount:2
    }
]),registerUser)
// router.route("/login").post(login)               

export default router