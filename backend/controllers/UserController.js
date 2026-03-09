
import userModel from "../models/userModel.js";
import axios from "axios";


async function saveUser(req, res) {
  
    //console.log("console"+JSON.stringify(req.body));
    // res.send(JSON.stringify(req.body));
    
    try {
      //  console.log(req.body);
      const newUser = new userModel(req.body);
      await newUser.save();
      res.json({ status: 202, msg: "User saved successfully!" });
    } catch (err) {
      console.error(err);
      res.json({ status: 503, msg: "Failed to save user." });
    }
}

function checkUser(req,res){
  // console.log(JSON.stringify(req.body));
  
    userModel.findOne({email:req.body.email,pwd:req.body.pwd})
    .then((docu)=>{
      if(docu!=null)
        res.json({status:true,msg:"Record found",obj:docu});
      else
        res.json({status:false,msg:"Invalid Email or password "});
    })
    .catch((err)=>{
      return res.json({status:false,msg:err.message});
    });
}

export default {saveUser,checkUser}
