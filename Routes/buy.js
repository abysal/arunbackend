const express=require("express");
const router=express.Router();
const Buy=require("../model/Buy");
const mongoose=require("mongoose");
const multer=require("multer");

const Auth=require('../Middleware/auth');
const path=require('path');
const async=require('async');


require('../DB/mongoose');




router.post('/bookbook/:id', Auth, function (req, res) {
    console.log("book reserved")
    
    uid = req.params.id.toString();
    console.log(uid);
    
    const bookb = new Buy({ bid: uid, status: "Booked", uid: req.user._id });
    bookb.save().then(function () {
      res.send('fine');
    })
  })

router.get('/bookedbook', function (req, res) 
{
Buy.find()
  .populate('bid')
  .populate('uid')
  .exec()
  .then(function (docs) {
    if (docs) {

      res.send({
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            bid: doc.bid,
            status: doc.status,
            uid: doc.uid

          }
        })
      })
    }

  })


});
router.get('/bookstatus', Auth, function (req, res) {
  console.log(req.user._id)

Buy.find({uid: req.user._id})
  .populate('bid')
  .populate('uid')
  .exec()
  .then(function (bookdash) {
    if (bookdash) {
console.log(bookdash);
      res.send({
        orders: bookdash.map(doc => {
          return {
            _id: doc._id,
            bid: doc.bid,
            status: doc.status,
            uid: doc.uid
    }
        })
      })
    }

  })


});
router.delete('/bookstatusdelete/:id',function(req,res){
    uid=req.params.id.toString();
    Buy.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })

module.exports=router;