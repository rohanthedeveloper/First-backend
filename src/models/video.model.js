import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,  //cloudinary url
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        publisher: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {     //we will get the duration of the video from cloudinary
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default : 0
        },
        isPublished: {
            type: Boolean,
            isPublished: true
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video" , videoSchema)