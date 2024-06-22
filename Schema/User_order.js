const mongoose=require('mongoose')
const user_order=new mongoose.Schema({
        user_id:{
            type:String,
            default:Date.now
        },
        table_no:{
            type:Number
        },
        main_dish:[{
            main_course:{type:String},
            amount:{type:Number}
        }],
        side_dish:[{
            type:String
        }],
        appietizer:[{
            type:String
        }]
})
module.exports=mongoose.model('User_order',user_order)