import { Router } from "express";
import { logOutUser,loginUser,registerUser,refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

const v =router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxcount:1
    },
    {
        name:"coverImage",
        maxcount:2
    }
]),registerUser)
// console.log(v?.key)
// router.route("/login").post(login)    

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT,logOutUser)

router.route("/refresh-token").post(refreshAccessToken)

export default router