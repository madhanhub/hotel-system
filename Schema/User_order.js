const mongoose=require('mongoose')
const user_order=new mongoose.Schema({
        user_id:{
            type:String,
            
        },
        table_no:{
            type:Number
        },
        main_dish:[{
            main_course:{type:String},
            quantity:{type:Number},
            amount:{type:Number}
        }],
        side_dish:[{
            side_course:{type:String},
            amount:{type:Number},
            quantity:{type:Number}
        }],
        appietizer:[{
            fruits:{type:String},
            amount:{type:Number},
            quantity:{type:Number}
        }]
})
module.exports=mongoose.model('User_order',user_order)