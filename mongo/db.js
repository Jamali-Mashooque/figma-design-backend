const { default: mongoose } = require("mongoose");

const connectDB =()=>{
    try  {
         mongoose.connect(process.env.MONGO_URL)
         .then( ()=>{
            console.log("connnected monngodb !")
         })
         .catch((error=>{
            console.log("connection Error : ", error.message)
         })
    )} catch (error) {
      console.log("Error",error.message)   
    }
}
module.exports=connectDB