const validator = {
    validateName:(user_name)=>{
        if(!/^[A-Z]+$/.test(user_name)){
            return false
        }
        return true
    },
    validateEmail:(email)=>{
        if(!/^[a-z0-9]@+$/.test(email)){
            return false
        }
        return true
    }
}
module.exports=validator