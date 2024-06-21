const admin=require('../Schema/Admin')
class admincontroller{
    static async Admin_register(
        user_name,email,password
    ){
        const admin_reg=await new admin({
            user_name,email,password
        }).save()
        return admin_reg
    }
    static async Admin_delete(
        _id
    ){
        const admin_del=await admin.findOneAndDelete({_id})
        return admin_del
    }
    static async Admin_login(
        email,password
    ){
        const admin_login=await admin.findOne({
            email,password
        })
        return admin_login
    }
    
}
module.exports=admincontroller