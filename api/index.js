import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { configDotenv } from 'dotenv';
import Message from '../model/message.js';
import apiEndpoints from '../endpoints/APIEndpoints.js';
import http from "http";
import { Server } from "socket.io";
import moment from 'moment-timezone'

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



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5000", // Replace this with your frontend domain in production
        methods: ["GET", "POST"]
    }
});





io.on('connection', (socket) => {

    socket.on('sendMessage', async (data) => {
        console.log(data)
        const date = new Date();        
        const istTime = moment.utc(date).tz("Asia/Kolkata").format("YYYY-MM-DD hh:mm:ss");        
        const message = new Message({from: data.from, to: data.to, text: data.text, date: istTime});
        await message.save();        
        io.emit('receiveMessage', message);
        
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});



app.get("/", (req, res) => res.send("Express on Vercel"));

mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Successfully connected")
});

apiEndpoints(app)



export default (req, res) => {
    server.emit('request', req, res);
};


