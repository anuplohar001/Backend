import mongoose from "mongoose";

const newComments = new mongoose.Schema({

    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prompts',
        required: true
    },

    padmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    isLike: {
        type: Boolean
    }
})

const comments = mongoose.models.comments || mongoose.model("comments", newComments)
export default comments