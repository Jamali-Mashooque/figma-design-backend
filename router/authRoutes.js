const express = require("express")
const { registerUserController, loginUserController, logoutUserController, authCheckController } = require("../controller/authControllers")
const authMiddleware = require("../middleware/authMiddleWare")

const authRoutes = express.Router()

authRoutes.post("/register-user",registerUserController)
authRoutes.post("/login-user",loginUserController)
authRoutes.post("/logout-user", logoutUserController)
authRoutes.post("/get-data",authMiddleware , (req,res)=>{
    return res.status(200).json({message:"Data is Coming..."})
})
authRoutes.get("/auth-check", authMiddleware , authCheckController)

module.exports= authRoutes