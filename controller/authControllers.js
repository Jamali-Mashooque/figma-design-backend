
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashed:", hashPassword);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            message: "Registration done !!",
            user: newUser
        });

    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};
const loginUserController = async(req,res)=>{
    try {
        const{email,password}=req.body;

        if(!email || ! password){
            return res.status(403).json({ message: "No Invalid Credentials!"})
        }

        const user=await User.findOne({email});
        console.log("user",user)

        if(!user){
            return res.status(404).json({message:"user not found !"})
        }
        const matched =await bcrypt.compare(password,user.password)
        console.log("matched",matched)
        if(!matched){
          return res.status(401).json({ message: "Wrong Password!" })

        }

        const token =await jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_TOKEN
        )
        console.log("token", token)

        res.cookie("token", token, {
             httpOnly: true,
               secure: true,
             sameSite: "none",
             
               maxAge: 7 * 24 * 60 * 60 * 1000,
                 });
        console.log("cookie", req.cookies);
        return res.status(200).json({ message: "Login Successsfully!", user })
    } catch (error) {
        console.log("Error : ",error.message)
    }
}
const logoutUserController = ( req,res)=>{
    try {
        res.clearCookie("token", {
           httpOnly: true,
           secure: true,
         sameSite: "none",
          });
       return res.status(200).json({message:"Logout Successfully!"})
    } catch (error) {
        console.log("Server Error : " , error.message)
    }
}
const authCheckController = (req, res) => {
  try {
     return res.status(200).json({message:"Verified !"})
  } catch (error) {
    console.log("Server Error : ", error.message)
  }
}
module.exports = {registerUserController ,loginUserController,logoutUserController ,authCheckController}