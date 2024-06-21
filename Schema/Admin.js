const mongoose=require('mongoose')
const admin=new mongoose.Schema({
    user_name:{
        type:String
    },
    email:{type:String},
    password:{type:String}
})
module.exports=mongoose.model('Admin',admin)