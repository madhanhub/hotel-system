const mongoose=require('mongoose')
const user=new mongoose.Schema({
    user_name:{
        type:String
    },
    user_email:{
        type:String
    },
    user_password:{
        type:String
    }
})
module.exports=mongoose.model('User',user)