import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from "cookie-parser";
import db from './db.js';
import userRouter from './routers/userRoute.js'
import blogRouter from './routers/blogRoute.js'
import authRouter from './routers/authRouter.js'
import cors from 'cors'

const app = express();
dotenv.config();

app.use(cors())
app.use(express.static('./uploads'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.json()); 

//using router
app.use('/api', userRouter)
app.use('/api', blogRouter)
app.use("/api", authRouter)


const port = process.env.port

app.listen(port, () => {
    console.log(`Server is running on port no ${port}`);
});
