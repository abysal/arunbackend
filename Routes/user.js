const express=require("express");
const router=express.Router();
const User=require("../model/User");
const mongoose=require("mongoose");
const Auth = require('../Middleware/auth');
const path = require('path');
const multer=require("multer");

// router.use(express.static(path.join(__dirname,'UserImg')))
//registration 
router.post("/registeruser",(req,res)=>
{
    console.log(req.body);

    const user=new User(req.body);
    user
    .save()
    .then(result=>{
        
        console.log(result);
        res.status(201).json({
        message:"User Registered successfully",

        })
    })
    .catch(err=>{
        res.status(500).json({
            
            error:err,
           // console.log(error);
        })
    })
})

//login
router.post("/Login",async function (req,res)
{
    
    var enteredUname=req.body.Username;
    var enteredpass=req.body.Password;
    console.log(enteredUname, enteredpass);
    const user=await User.checkCredentialsDb(enteredUname,enteredpass);
    if(user){
    const token=await user.generateAuthToken();
    res.send({
        token:token,
        userType:user.Usertype
    });
}
else{
    res.json({message:"Invalid"});
}
})

//log out
router.post('/logout', Auth, async (req,res) =>{
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
        } catch (e) {
        res.status(500).send()
        }
       });

//show all user
router.get("/showuser",Auth,function(req,res){
   User.find().then(function(User){
        console.log(User);
        res.send(User);
    }).catch(function(e){
        res.send(e);
    })   
})    



    

//upload profile picture
var storage = multer.diskStorage({
    destination: 'ProfilePicture',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'User' + Date.now() + ext);
    }
});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000000 }
});
router.post('/uploadImg', upload.single('imageFile'), (req, res) => {
       res.send(req.file);
       console.log(req.file)
        });

        
        
router.get('/this',Auth,function(req,res){
    res.send(req.user);
})
//delete user
router.delete('/deleteuser/:id',Auth, function (req, res) {    
            
    console.log(req.params.id);
     User.findByIdAndDelete(req.params.id).then(function(){
         res.send("Successfully deleted");
     }).catch(function(e){
         res.send(e);
     }) ;
     });
//user update
router.put('/updateuser',function(req,res){
    userid = req.body._id;
    console.log(userid);
    console.log(req.body._id);
    User.findByIdAndUpdate(userid,req.body,{new: true}, (err,User) => {
    res.send(User);
    console.log(User);
        });
    })
module.exports=router;