const user_order=require('../Schema/User_order')
class ordercontroller{
    static async User_order(
        user_id,table_no
    ){
        const order=await new user_order({
            user_id,table_no
        }).save()
        return order
    }
    static async User_order(
        _id,main_course,amount,quantity
    ){
        const order_placed=await user_order.findOneAndUpdate({_id},
            {$push:{main_dish:{
                main_course,amount,quantity
            }}})
            return order_placed
    }
}
module.exports=ordercontroller