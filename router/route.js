const express=require('express');
const route=express.Router();
const User=require('../model/schema');
const  {register,validate}=require('../middleware/validation');


//Register User
route.post('/registeruser',register(),validate,async function(req,res){
    const {Fname,Lname,email,address,gender,mobile}=req.body;

    if(!Fname || !Lname || !email || !address || !gender || !mobile){
        return res.status(422).json({error:"please fill all the field"});
    }
   try{
         const userExist=await User.findOne({email:email})
    if(userExist){
        return res.status(422).json({error:"email already exists"})
    }
    const usermobile=await User.findOne({mobile:mobile})
    if(usermobile){
        return res.status(422).json({error:"Mobile already exists"})
    }
    
    const user=new User({Fname,Lname,email,address,gender,mobile});
    
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var Valid_mob= re.test(mobile);
  
    if(Valid_mob==true){
        const userregister=await user.save();
        if(userregister){
            res.status(200).json({message:"user registered succesfully"});
        }
    }
    else{
        res.json({
            message: "Invalid Number",
            statusCode:'400',
        })
    } 
} catch(err){
    console.log(err);
}     
});

//get details 
route.get('/getuser',async function(req,res){
    try{
        const user_data = await User.findOne({_id:req.body.id})
        if(!user_data){
            res.json({
            message: "User Not Found",
            statusCode:'200',
        })
          }else{
            res.json({
               message: "User found Successfully",
               statusCode:'200',
               data:user_data,
            })
          }
    }catch(error){
        console.log(error.message);
        res.json({
            message:"Failed  To Found User ",
            statusCode:"500"
        })
    }
 });

//update user by name
route.put('/updateuser',async function(req,res){
    try{
        let data= await User.updateOne(
       req.query,  
       { $set:req.body
       }
   );
   if(!data){
       res.json({
           message:'User not found ',
           statusCode:'200',
       })
   }else{
       res.json({
           message:'User Updated Successfully',
           statusCode:'200',
           data:data
       })
   }

   }catch(error){
       res.json({
           message:'Failed To Update User',
           statusCode:'500'
       })
   }
 
 });

//delete User
route.delete('/deleteuser',async function(req,res){
    try{
        const data = await User.deleteOne({_id:req.body.id})
        console.log(data);
        if(!data){
           res.json({
            message: "user not found",
            statusCode:'200',
        })
          }else{
           res.json({
               message: "user Deleted",
               statusCode:'200'
            })
          }
    }catch(error){
        console.log(error.message);
       res.json({
            message:"Failed  To Delete User ",
            statusCode:"500"
        })
    }
 });


module.exports=route;