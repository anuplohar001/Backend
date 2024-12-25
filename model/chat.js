import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
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
)

const Message = mongoose.model("hello", MessageSchema)
export default Message