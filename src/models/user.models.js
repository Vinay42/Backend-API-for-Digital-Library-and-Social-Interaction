import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrpt from "bcrypt"

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudnary url
        required:true,
    },
    converImg:{
        type:String, //cloudnary url
    },
    watchHistory:{
        type:Schema.Types.ObjectId ,
        ref:"video"
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:string

    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.ismodifiled("password")) return next();

    this.password = bcrpt.hash(this.password,10)
    next()
})

userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrpt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = fuction(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefressToken = fuction(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPERY
    }
)
}

export const User = mongoose.model("User",userSchema)