const mongoose=require('mongoose')
const validator=require('../validator')
const user=new mongoose.Schema({
    user_name:{
        type:String,
        validate:{
            validator:validator.validateName,
            message:'user_name'
        }
    },
    user_email:{
        type:String,
        validate:{
            validator:validator.validateEmail,
            message:'email'
        }
    },
    user_password:{
        type:String
    }
})
module.exports=mongoose.model('User',user)