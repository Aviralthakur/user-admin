import  express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
//import { Router } from 'express.Router'
//import UserOtp from './UserOtp'
//import { google } from 'googleapis'

//const {google}=require('googleapis')
import bcrypt from 'bcrypt'
//import nodemailer from 'nodemailer'
//require('dotenv').config()
//const {v4:uuidv4} =require("uvid")

/*const CLIENT_ID='224265031300-k3kflq86s1ocad7i72dqmcvtd689oeu0.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URL='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04ZQR4b6PKmYSCgYIARAAGAQSNwF-L9IrAmxcJxU1VFS-ZkQESDi9GDkEwlloHuj7VB0PrFZ0kqCFgoSlmjYdlAOCsLYW54_FZIQ'
const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
const accessToken=await oAuth2Client.getAccessToken()*/

const app= express()
 app.use(express.json())
 app.use(express.urlencoded())
 app.use(cors())

 mongoose.connect('mongodb://localhost:27017/my-app',{
     useNewUrlParser: true,
     useUnifiedTopology :true
 },() => {
     console.log('Db connected')
 })

 app.listen(9002,()=>{
    console.log('be started at port 9002')
})


 //Nodemailer stuff
 /*let transporter= nodemailer.createTransport({
       service: 'gmail',
       auth:{
            type:'OAuth2',
           user:'aviral28thakur@gmail.com',
        
           clientId:CLIENT_ID,
           clientSecret:CLIENT_SECRET,
           refreshToken:REFRESH_TOKEN,
           accessToken:accessToken
       }
 })
 

 const UserOtpSchema =new mongoose.Schema({
    userId:String,
    otp :String,
    createdAt:Date,
    expiresAt:Date
})

const UserOtp= new mongoose.model(
    "userOtp",
    UserOtpSchema
)*/

//UserLogin
 const userSchema = new mongoose.Schema({
    use:String,
    email:String,
    name:String,
    mobile:String,
    passworld:String,
    cpassworld:String
 })

 const User=new mongoose.model("user",userSchema)

 //UserRegistration
const cregisterSchema=new mongoose.Schema({
    firstname:String , 
    lastName:String,
    gender:String ,
         fathername :String,
         mobilenumber :String,
        mothername:String , 
        email:String ,
         age:String ,
         altmobilenumber:String ,
         houseno:String ,
        streetname:String ,
         areaname:String ,
        pincode:String ,
        state :String,
        nationality:String
 })
  
 const Cource=new mongoose.model("cource",cregisterSchema)


 //Routes

 //login 

 app.post('/Login',(req,res)=>{
    const{email,passworld}=(req.body)
    User.findOne({email:email},(err,user)=>{
        if(user)
        {
             if(passworld===user.passworld){
               // sendOtpVerificationEmail(user._id,email)
                 res.send({message:'login successful',user:user})
                 
             } 
             else{
                 res.send({ message:'wrong passworld'})
             }
        }else{
            res.send({message:'user not registered'})
        }
    })
 })


 //signup

 app.post('/Register',(req,res)=>{
    const {use,name,email,mobile,passworld}=(req.body)
          User.findOne({email: email},(err,user)=>
          {
              if(user){
                  res.send({message:" user already registered"})
              } else{
                     
    const user=new User({
        use,
        name,
        email,
        mobile,
        passworld
    })
    user.save(err => {
         if(err){
             res.send(err)
         }
         else res.send({ message :"Sussessfully Registered"})
    })
}
              })
     
            })


   // Cource Registration
   
   app.post('/user/addAdmission',(req,res)=>{
    const{firstname , lastName ,gender , fathername , mobilenumber , mothername , email , age , altmobilenumber , houseno , streetname , areaname ,
        pincode , state , nationality}=(req.body)
        Cource.findOne({email: email},(err,cource)=>
        {
            if(cource){
                res.send({message:" user already registered"})
            } else{
             
                const cource=new Cource({
                    firstname , lastName ,gender , fathername , mobilenumber , mothername , email , age , altmobilenumber , houseno , streetname , areaname ,
          pincode , state , nationality
                })
             
               cource.save(err => {
                    if(err){
                        res.send(err)
                    }
                    else res.send({ message :"Sussessfully Registered"})
               })

            }
        })

   })



 




 /*const sendOtpVerificationEmail=async(_id,email) =>{
     try{  
            const otp= `${Math.floor(1000 +Math.random() *9000)}`
            const mailOption={
                from: 'aviral28thakur@gmail.com',
                to:email,
                subject:"Verify Your Email",
                text:"Enter {otp} in the app to verify.This code will expire in 1 hour",
                html:`<p>Enter <b>${otp}</b> in the app to verify</p><p>This code will expire in 1 hour</p>`
            }   
              
            const saltRounds=10

     const hashedOtp = await bcrypt.hash(otp,saltRounds)
     const newOtp =await new UserOtp({
         userId:_id,
         otp: otp,
         createAt:Date.now(),
         expiresAt:Date.now() +3600000
     })

      // save otp
      await newOtp.save();
      await transporter.sendMail(mailOption,function(err,newOtp){
           if(err)
           {  console.log("error")  }
           else{
            console.log("success") 
           }
      })
     /* res.send({
          status:'pending',
          message: "Verification otp email",
          data:{
              userId:_id,
              email
          }
      })*/

    /* }
     catch(error){
            message: "error"
           
     }
 }

 // verify otp 
app.post('/user/step',async(req,res)=>{
     
    try{

        const{otp}=(req.body)
       UserOtp.findOne({otp:otp},(err,userOtp)=>{
          
           
             if(userOtp)
             {
               
                res.send({
                    message:'Verified',user:userOtp})
                     
             }
             else{
                res.send({message:'Wrong Otp'})
             }
            
        })
    }
    catch(error){
        console.log(error)
    }
    })


 /* if( !uotp){
            res.send("Enter otp details")
        }
        
        else{
            const UserOtpRecord= await UserOtp.find({
                userId,
            })
              
            if(UserOtpRecord.length<=0)
            {
                res.send(
                  "Account record dosen't exist"
                )
            }
            else{
                //user otp record 
                const {expiresAt }=UserOtpRecord[0];
                const hashedOtp=UserOtpRecord[0].otp

                if(expiresAt<Date.now()){
                    await UserOtp.deleteMany({userId})
                    res.send("code has expired")
                }
                else{
                   const validOtp= await bcrypt.compare(otp,hashedOtp);
                   if(!validOtp){
                       res.send("Invalid code pass");

                   }else{
                       User.updateOne({_id:userId})
                       await UserOtp.deleteMany({userId})
                       res.json({
                           
                           message:'user email verified'
                       })
                   }
                
                }
            }


        }*/