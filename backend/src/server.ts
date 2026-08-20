import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app: Express = express();
const port=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.get('/', (req:Request,res:Response)=>{
    res.send("Hello World");
});
app.listen(port, ()=>{
    console.log(`I'm listening to port ${port}`);
})