const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const morgan=require('morgan')
const bodyparser=require('body-parser')

const admin=require('./Schema/Admin')
const menu=require('./Schema/Menu')
const user=require('./Schema/User')
const user_order=require('./Schema/User_order')

const admincontroller=require('./Controller/AdminController')
const menucontroller=require('./Controller/menuController')
const usercontroller = require('./Controller/UserController')
const ordercontroller=require('./Controller/User_Ordercontroller')

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
        const { main_dish,side_dish,appietizer}=req.body
    const menu_o=await menucontroller.Menu(
        main_dish,side_dish,appietizer
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
        const { _id,main_course,amount}=req.body
        const main_update=await menucontroller.Main_update(
            _id,main_course,amount
            )
        
            res.status(200).json({message:'main_dish added',data:main_update})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})
app.post('/side/push',async(req,res)=>{
    try{
        const { _id,side_course,amount}=req.body
        const side_push=await menucontroller.Side_push(
            _id,side_course,amount
            )
        
            res.status(200).json({message:'side_dish added',data:side_push})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})
app.post('/side/pull',async(req,res)=>{
    try{
        const { _id,side_course,amount}=req.body
        const side_pull=await menucontroller.Side_pull(
            _id,side_course,amount
            )
        
            res.status(200).json({message:'side_dish added',data:side_pull})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})
app.post('/side/update',async(req,res)=>{
    try{
        const { _id,side_course,amount}=req.body
        const side_update=await menucontroller.Side_update(
            _id,side_course,amount
            )
        
            res.status(200).json({message:'side_dish added',data:side_update})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})
app.post('/appietizer/push',async(req,res)=>{
    try{
        const { _id,fruits,amount}=req.body
        const appietizer_push=await menucontroller.Appietizer_push(
            _id,fruits,amount
            )
        
            res.status(200).json({message:'side_dish added',data:appietizer_push})
    }catch(error){
        res.status(500).json({message:'menu not added'})
    }
})
app.post('/appietizer/pull',async(req,res)=>{
    try{
        const{_id,fruits}=req.body
        const app_pull=await menucontroller.Appietizer_pull(
            _id,
            fruits
        )
        res.status(200).json({message:'appietizer pulled',data:app_pull})
    }catch(error){
        res.status(500).json({message:'appieteizer not removed'})
    }
})
app.post('/appietizer/update',async(req,res)=>{
    try{
        const{_id,fruits,amount}=req.body
        const app_update=await menucontroller.Appietizer_update(
            _id,
            fruits,amount
        )
        res.status(200).json({message:'appietizer pulled',data:app_update})
    }catch(error){
        res.status(500).json({message:'appieteizer not removed'})
    }
})
app.get('/menu/list',async(req,res)=>{
        try{
            const menu_list=await menu.find({})
            res.status(200).json({message:'menu listed',data:menu_list})
        }catch(error){
            res.status(500).json({message:'menu not listed'})
        }
})
app.post('/user/register',async(req,res)=>{
   
    try{
        const{user_name,user_email,user_password}=req.body      
        const existing_user=await user.findOne({user_email})
        if(existing_user){
            return res.status(409).json({message:'user already exist'})
        }
        
        const user_register=await usercontroller.User_register(
            user_name,user_email,user_password
        )
        res.status(200).json({message:'user register',data:user_register})
    
    }catch(error){
        res.status(500).json({message:'user registeration failed'})
        }
})
app.post('/user/login',async(req,res)=>{
    try{
        const{ user_email,user_password}=req.body
        const login=await usercontroller.User_login(
            user_email,user_password
        )
        res.status(200).json({message:'login successfully',data:login})
    }catch(error){
        res.status(500).json({message:'login failed'})
    }
})
app.get('/user/view',async(req,res)=>{
    try{
        const menu_list=await menu.find({})
        res.status(200).json({message:'menu listed',data:menu_list})
    }catch(error){
        res.status(500).json({message:'menu not listed'})
    }
})
app.post('/user/order',async(req,res)=>{
    try{
        const{user_id,table_no}=req.body
        const order=await ordercontroller.User_order(
            user_id,table_no
        )
        res.status(200).json({message:'order placed',data:order})
    }catch(error){
        res.status(500).json({message:'order not placed'})
    }
})
app.post('/order/place',async(req,res)=>{
    try{
        const{_id,main_course,amount}=req.body
        const order_find=await menu.findOne({_id,'main_dish.0.main_course':main_course,'main_dish.0.amount':amount})
        console.log(order_find);
        const order_place=order_find.main_dish.main_course
        await user_order.findOneAndUpdate({_id:req.body._id},
            {$push:{main_dish:{main_course,amount}}})
            
            res.status(200).json({message:'order placed',data:order_place})
    }catch(error){
        res.status(500).json({message:'order failed'})
    }
})
