const express=require("express")
const dotenv =require("dotenv")
const connectDB = require("./mongo/db")
const app=express()
const bodyparser = require("body-parser")
const authRoutes = require("./router/authRoutes")
const cookieParser = require("cookie-parser")
const cors = require("cors");
dotenv.config()
app.use(cors({
    origin: "https://figma-design-phi-opal.vercel.app",
      credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use("/auth",authRoutes)
app.get("/",(req,res)=>{
    try {
        res.send("api is workig")
    } catch (error) {
        console.log("Error :",error.message)
    }
})

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is running on ${process.env.PORT}`)
    connectDB()
})