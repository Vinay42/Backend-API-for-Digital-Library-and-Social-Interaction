import { asyncHandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullName, email, userName, password } = req.body
    console.log("email: ", email)

    // if(fullName === ""){
    //     throw new apiError(400, "Full name is required")
    // }

    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are reqired")
    }

    const exitedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if (exitedUser) {
        throw new apiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImgLocalPath = req.files?.coverImg[0]?.path

    if (!avatarLocalPath) {
        throw new apiError(400, "Avtar file is reqired")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImg = await uploadOnCloudinary(coverImgLocalPath)

    if (!avatar) {
        throw new apiError(400, "Avtar file is reqired")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImg: coverImg?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "--password -refreshToken"
    )

    if (!createdUser) {
        throw new apiError(500, "Someting went wrong while registering the user")
    }

    return res.status(201).json(
        new apiResponse(200, "User registered successfully")
    )

})

export { registerUser }