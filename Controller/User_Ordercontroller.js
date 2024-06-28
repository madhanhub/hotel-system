const user_order=require('../Schema/User_order')
class ordercontroller{
    static async User_order(
        user_id,table_no,main_dish,side_dish,appieteizer
    ){
        const order=await new user_order({
            user_id,table_no,main_dish,side_dish,appieteizer
        }).save()
        return order
    }
    static async User_Order(
        _id,main_course,amount,quantity
    ){
        const order_placed=await user_order.findOneAndUpdate({_id},
            {$push:{main_dish:{
                main_course,amount,quantity
            }}})
            return order_placed
    }
    static async User_order_delete(
        _id,main_course
    ){
        const order_removed=await user_order.findOneAndUpdate({_id},
            {$pull:{main_dish:{
                main_course
            }}})
            return order_removed
    }
    static async User_order_update(
        _id,main_course,amount,quantity
    ){
        const order_update=await user_order.findOneAndUpdate({_id},
            {$set:{main_dish:{
                main_course,amount,quantity
            }}})
            return order_update
    }
    static async Side_dish_order(
        _id,side_course,amount,quantity
    ){
        const side_order_placed=await user_order.findOneAndUpdate({_id},
            {$push:{side_dish:{
                side_course,amount,quantity
            }}})
            return side_order_placed
    }
}
module.exports=ordercontroller