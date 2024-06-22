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
}
module.exports=ordercontroller