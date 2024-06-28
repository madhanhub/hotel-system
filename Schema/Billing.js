const mongoose=require('mongoose')
const bill=new mongoose.Schema({
        user_id:{
            type:String,
        },
        order_id:{
            type:String
        },
        order_bill:[{
            main_course:{
                type:Number
            },
            side_course:{
                type:Number
            },
            date:{
                type:Date,
                default:Date.now
            },
        }]
})
module.exports=mongoose.model('Billing',bill)