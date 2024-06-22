const mongoose=require('mongoose')
const menu=new mongoose.Schema({
        // admin_name:{
        //     type:String
        // },
        main_dish:[{
            main_course:{type:String,
                default:'avaliable'
            },
            amount:{type:Number},
            
        }],
        side_dish:[{
            side_course:{
                type:String,
                default:'avaliable'
                },
            amount:{type:Number}
        }],
        appietizer:[{
            fruits:{type:String,
                default:'avaliable'},
            amount:{type:Number}
        }
    ]
    
        
})
module.exports=mongoose.model('Menu',menu)