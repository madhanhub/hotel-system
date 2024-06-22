const user=require('../Schema/User')
class usercontroller{
    static async User_register(
        user_name,user_email,user_password
    ){
        const user_register=await new user({
            user_name,user_email,user_password
        }).save()
        return user_register
    }
    static async User_login(
        user_email,user_password
    ){
        const user_login=await user.findOne({
            user_email,user_password
        })
        return user_login
    }
}
module.exports=usercontroller