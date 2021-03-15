const mongoose= require("mongoose")
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/registration",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log("no connection")
})