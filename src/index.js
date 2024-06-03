// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import ConnectDB from "./db/index.js";
// import mongoose, { connect } from "mongoose";
// import {DB_NAME} from "./constants"


dotenv.config({
    path : './env'
})


ConnectDB()















/*
import express from "express"

const app=express()

(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        app.on("error:",(error)=>{
            console.log("ERROR:",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.port}`)
        })
    }
    catch(error){
        console.log("ERROR:",error);
        throw err
    }
})() */