const menu=require('../Schema/Menu')
class menucontroller{
    static async Menu(
        admin_name
    ){
        const Menus=await new menu({
            admin_name
        }).save()
        return Menus
    }
    static async Main_push(
        _id,main_course,amount
    ){
        const main_push=await menu.findOneAndUpdate({_id},
            {$push:{main_dish:{
                main_course,amount
            }}})
            return main_push
    }
    static async Main_pull(
        _id,main_course
    ){
        const main_pull=await menu.findOneAndUpdate({_id},
            {$pull:{main_dish:{
                main_course
            }}})
            return main_pull
    }
    static async Main_update(
        _id,main_course,amount
    ){
        const main_update=await menu.findOneAndUpdate({_id},
            {$set:{main_dish:{
                main_course,amount
            }}})
            return main_update
    }
    static async Side_push(
        _id,side_course,amount
    ){
        const side_push=await menu.findOneAndUpdate({_id},
            {$push:{side_dish:{
                side_course,amount
            }}})
            return side_push
    }
    static async Side_pull(
        _id,side_course
    ){
        const side_pull=await menu.findOneAndUpdate({_id},
            {$pull:{side_dish:{
                side_course
            }}})
            return side_pull
    }
    static async Side_update(
        _id,side_course,amount
    ){
        const side_update=await menu.findOneAndUpdate({_id},
            {$set:{side_dish:{
                side_course,amount
            }}})
            return side_update
    }
}
module.exports=menucontroller