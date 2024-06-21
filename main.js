const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const morgan=require('morgan')
const bodyparser=require('body-parser')

const admin=require('./Schema/Admin')
const menu=require('./Schema/Menu')

const admincontroller=require('./Controller/AdminController')
const menucontroller=require('./Controller/menuController')

app.use(express.json())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))

app.listen(5467,()=>{
    console.log('server run');

    mongoose.connect('mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/',
    // {
    //     useNewUrlParser :true,
    //     useUnifiedTopology :true
     //}
     )
    .then(()=>{
        conn=mongoose.connection
        console.log('databse connected');
    })
    .catch((error)=>{
        console.log('database not connected',error);
    })
    
})

app.get('/',async(req,res)=>{
    res.send('welcome')
})

app.post('/admin',async(req,res)=>{
    try{
        const{user_name,email,password}=req.body
        const admin_reg=await admincontroller.Admin_register(
            user_name,email,password
        )
        res.status(200).json({message:'admin register',data:admin_reg})
    }catch(error){
        res.status(500).json({message:'register failed'})
    }
})
app.post('/admin/register/delete',async(req,res)=>{
    try{
        const{_id}=req.body
        const admin_del=await admincontroller.Admin_delete(_id)
        res.status(200).json({message:'admin removed',data:admin_del})
    }catch(error){
        res.status(500).json({message:'admin not removed'})
    }
})

app.post('/admin/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const admin_login=await admincontroller.Admin_login(email,password)
        res.status(200).json({message:'admin login',data:admin_login})
    }catch(error){
        res.status(500).json({message:'login failed'})
    }
})
app.post('/menu',async(req,res)=>{
    try{
        const {admin_name}=req.body
    const menu_o=await menucontroller.Menu(
        admin_name
    )
        res.status(200).json({messagr:'menu added',data:menu_o})
    }catch(error){
        res.status(500).json({message:'something wrong'})
    }
})
app.post('/main/add',async(req,res)=>{
    try{
        const { _id,main_course,amount}=req.body
        const menu_added=await menucontroller.Main_push(
            _id,main_course,amount
            )
            res.status(200).json({message:'main_dish added',data:menu_added})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})
app.post('/main/pull',async(req,res)=>{
    try{
        const { _id,main_course}=req.body
        const main_pull=await menucontroller.Main_pull(
            _id,main_course
            )
            res.status(200).json({message:'main_dish added',data:main_pull})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})
app.post('/main/update',async(req,res)=>{
    try{
        // const { _id,main_course}=req.body
        // const main_pull=await menucontroller.Main_pull(
        //     _id,main_course
        //     )
        const main_update=await menu.findOneAndUpdate({_id:req.body._id},
            {$set:{main_dish:{
                main_course:req.body.main_course,
                 amount:req.body.amount
            }}})
            res.status(200).json({message:'main_dish added',data:main_update})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})