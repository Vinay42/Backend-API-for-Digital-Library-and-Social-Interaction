import mongoose, {Schema, SchemaType} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoShema = new Schema({
    videoFile:{
        type:String, //cloudnary url
        require:true,
    },
    thumbnail:{
        type:String,  //cloudnary url  
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    duration:{
        type:Number,
        require:true, 
    },
    views:{
        type:Number,
        default:0 
    },
    isPublish:{
        type:Boolean,
        default:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

    }
,{timestamps:true})

videoShema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("Video",videoShema)
