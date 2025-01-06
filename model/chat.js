import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prompts'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const Message = mongoose.model("messages", MessageSchema)
export default Message