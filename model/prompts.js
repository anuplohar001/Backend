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

})


const Prompt = mongoose.models.prompts || mongoose.model("prompts", newPrompt);

export default Prompt