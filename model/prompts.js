import mongoose from "mongoose";

const newPrompt = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },

    tag: {
        type: String,
        required: true
    },

    padmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    comment: [{
        content:String,
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],

    like: [mongoose.Schema.Types.ObjectId]

})


const Prompt = mongoose.models.prompts || mongoose.model("prompts", newPrompt);

export default Prompt