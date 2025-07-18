import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()  //similar to creating an app using express

//https://localhost:8000/api/v1/users/register
router.route("/register").post(
    upload.fields(          //injecting middlware before registerUser
        [
            {
                name: "avatar",  //frontend name should also be the same "avatar"
                maxCount: 1      //maxCount is the number of how many files we are accepting
            },
            {
                name: "coverImage",
                maxCount: 1
            }
        ]
    ),    
    registerUser)

export default router