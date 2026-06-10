const jwt= require("jsonwebtoken");

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"unauthorize User !!!"})
        }

        const decode = await jwt.decode(token , process.env.JWT_TOKEN)
        console.log("PASSSSED")
        req.user = decode
        next()
    } catch (error) {
        console.log("Server Error : ", error.message)
    }
}

module.exports = authMiddleware