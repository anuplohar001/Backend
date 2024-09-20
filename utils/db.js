import mongoose from "mongoose";

let isConnect = false

const connectDb = async (MONGODB_URI) => {
    
    try {
        if(isConnect){
            console.log("Already connected")
            return true
        }
        await mongoose.connect(MONGODB_URI);
        console.log(MONGODB_URI);
        console.log("connection successful to DB");
        isConnect = true
        return true
    } catch (error) {
        console.error("database connection fail");
        process.exit(0);
    }
};
export default connectDb