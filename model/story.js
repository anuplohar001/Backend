import mongoose from "mongoose";

// Define the User schema
const storySchema = new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    story: {
        type: String,
        required: true
    },

},
    { timestamps: true }
);

// define the model or the collection name
const Story = mongoose.models.story || mongoose.model("Story", storySchema);
export default Story