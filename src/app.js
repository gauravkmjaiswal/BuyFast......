require('dotenv').config({});
 bcrypt= require("bcryptjs")
 const auth=require("./middleware/auth")
 const  express= require("express")
 const mongoose= require("mongoose")
 const hbs= require("hbs")
 const path= require("path")
 const cookieParser=require("cookie-parser")
 const app = express()
 const port= process.env.PORT || 4000
 require("./db/connection.js")
 const RegisterPeople=require("./models/registers")
 const static_path=path.join(__dirname,"../public")
 const template_path = path.join(__dirname,"../templates/views")
 const partials_path = path.join(__dirname,"../templates/partials")
 // console.log(static_path)
 app.use(express.json())
 app.use(cookieParser())
 app.use(express.urlencoded({extended:false}))
 app.use(express.static(static_path));
 
 
 
 app.set("view engine", "hbs");
 app.set("views",template_path);
 hbs.registerPartials(partials_path)
 app.get('/',(req,res)=>{
    
    console.log("hello")
     res.render("index")
     
 })
//  app.post('/Notes',auth,async(req,res)=>{
//  console.log(req.body.notes)
//      req.user.userdata=req.user.userdata.concat({note:req.body.notes,sub:req.body.subjects})
//      res.render("index")
//      await req.user.save()
//  })
 
 
 app.get('/secret',auth,async(req,res)=>{
 res.render("secret")
 })
 
 app.get('/logout',auth,async(req,res)=>{
 try {
    
     req.user.tokens=req.user.tokens.filter((cur)=>{
       if(cur.token!==req.token)
       {
 return 1
       }
       else{
           return 0
       }
     })
 
 
     res.clearCookie("jwtlogin")
     await req.user.save();
  
     res.render("login")
  
 } catch (error) {
     res.status(401).send("wow")
     console.log("hi {} !!!   3")
 }
 })
 app.get('/register',(req,res)=>{
     res.render("register")
 })
 app.get('/login',(req,res)=>{
     res.render("login")
 })
 app.post('/login',async (req,res)=>{
     try {
         const name=req.body.your_name;
         const pass=req.body.your_pass;
         const user=await RegisterPeople.findOne({name:name})
      
         const token=await user.generateAuthToken();
         res.cookie("jwtlogin",token,{
         expires: new Date(Date.now()+300000),
         httpOnly:true
         })
         
     //    console.log(`this is the cookie ${req.cookies.jwtlogin} `)
 
       if(user)
       {
 
         const matchh=await bcrypt.compare(pass,user.pass)
         if(matchh)
         {
             res.status(201).render("index")
         }
         else{
             res.status(400).send("wrong details")
         }
 
       }
       else{
           res.status(400).send("wrong details this")
           console.log("400")
       }
  
     }catch(error){
         // res.status(400).send("wrong details what")
 
         console.log("hello")
     }
 })
 
 
 app.post('/register',async (req,res)=>{
     try{
         const pas= req.body.pass;
         const re_pas= req.body.re_pass;
         if(pas!==re_pas)
         {
             return res.send("password and coonfirm password are diffrent !!!")
         }
 
 
         const regisPerson= await new RegisterPeople({
             name: req.body.name,
             email:req.body.email,
             pass:req.body.pass
          
             
 
         })
 
         const token=await regisPerson.generateAuthToken();
 
         res.cookie("jwt",token,{
             expires:new Date(Date.now()+300000),
             httpOnly:true
         })
 
         const finalPeople= await regisPerson.save()
         res.status(201).render("login")
 
     }catch(e)
     {
         res.status(400).send("error")
     }
 })
 
 
 app.listen(port,()=>{
     console.log("server is working well")
 })