import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String, //cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

//Pre is a hook/middleware functions which are executed one after another, when each middleware calls next. 
//we will use pre hook just before saving the password, to encrypt it
userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)  //10 is the number of rounds bcrypt will use to encrypt the password
    next()
})

//bcrypt library can hash the password as well as can check it also
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);    //here we will compare the password came from the client and the previously stored encrypted password
}

//method to generate access tokens
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
        //payload_name: key_from_database
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
 
//method to generate refresh tokens
userSchema.methods.generateRefreshTokens = function(){
    jwt.sign(
        {
        //payload_name: key_from_database
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)