import {asyncHandler} from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryUploader } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/*
**steps to follow to register user to database**
step1: get the user details from frontend
step2: validation (are user details correct, like email, username, etc.)
step3: check if user already exists (using username or email)
step4: check for images and avatars
step5: if available then upload them to cloudinary
step6: create user object - create entry in database
step7: remove password and response token from the response before passing it to frontend
step8: check for user creation
step9: return response
*/

//we get user details in req.body()

const registerUser = asyncHandler( async(req, res) => {
    //step1: getting the user details from frontend
    //we get user details which are sent by the frontend in the req.body
    const {username, fullName, email, password} = req.body
    console.log("email: " , email);

    //step2: validating the user details
    //we can use simple if else or we can use below code. we can apply so many validations as required
    if(
        [username, fullName, email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(statusCode = 400, message = "All fields are required")
    }

    //step3: check if the user already exist
    const existedUser = User.findOne(
        {
            $or: [{email} , {username}]     //this method will return the first document from database which matches either email or username
        }
    )

    if(existedUser){
        throw new ApiError(statusCode = 409, message = "User already existed")
    }

    //step4: checking for images and avatar
    //uploading to server
    const avatarLocalFilePath = req.files?.avatar[0]?.path      //this is currently at our server and is not uploaded yet to cloudinary
    const coverImageLocalFilePath = req.files?.coverImage[0]?.path
    //checking
    if(!avatarLocalFilePath){
         throw new ApiError(400, "Avatar is required")
    }

    //step5: uploading avatar and cover image to cloudinary
    const avatar = await cloudinaryUploader(avatarLocalFilePath)         //here we are getting the url of the image as response in return
    const coverImage = await cloudinaryUploader(coverImageLocalFilePath)

    //check if the images are uploaded on cloudinary or not
    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    //step6: create object and do entry to the database
    const user = await User.create({
        fullName,
        avatar,
        coverImage: coverImage || "",
        username: username.toLowerCase(),
        email,
        password
    })

    //check if the user is entered in the database or not
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"               //this .select method we are applying to select and remove the
                                                //password and refresh token fieds. remember the syntax is -password
        
    )

    //step8: check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registring the user")
    }

    //step9: returning response
    return res.status(201).json(
        new ApiResponse(statusCode = 200 , data = createdUser, message = "User registered successfully")
    )
})

export {registerUser} 