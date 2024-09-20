import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists !'],
        required: [true, 'Email is required !']
    },
    username: {
        type: String,
        required: [true, 'Username is required !'],
    },
    image: {
        type: String,
    },

    phone: {
        type: String
    },

    password: {
        type: String,
    }
});

// define the model or the collection name
const User = mongoose.models.users || mongoose.model("User", userSchema);
export default User