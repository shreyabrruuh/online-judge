import express from 'express';
const app= express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import DBConnection from './database/userdb.js';

import cookieParser from 'cookie-parser';
import router from './routes/routes.js';
import router2 from './routes/ContestRoutes.js';
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const corsOptions = {
    origin:['https://www.codeuniverse.tech','http://localhost:5173'], // Your frontend's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
  
  app.use(cors(corsOptions));
app.use(cookieParser());



DBConnection();

app.use('/',router);
app.use('/',router2);

app.listen(8000, ()=>{
    console.log('server is running on port 8000');
});