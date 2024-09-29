import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
    {
        origin:[""],
        methods:["POST", "GET"],
        credentials:true
    }
));

app.use('/posts', postRoutes);
app.use('/user',userRoutes);

// const CONNECTION_URL = 'mongodb+srv://pranjul:pran123@cluster0.5ny4f6x.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

app.get("/",(req,res) =>{
    res.json("hello");
})

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

