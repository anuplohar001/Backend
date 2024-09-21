import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { configDotenv } from 'dotenv';
import apiEndpoints from '../endpoints/APIEndpoints.js';

configDotenv()
const app = express();

const corsOptions = {
    origin: ["http://localhost:5000", "https://prompts-book.vercel.app"],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Express on Vercel"));

mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Successfully connected")
});

apiEndpoints(app)

export default app

