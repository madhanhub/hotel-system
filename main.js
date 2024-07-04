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
const bill=require('./Schema/Billing')

const env=require('dotenv').config() 
const jsonwebtoken=require('jsonwebtoken')

const admincontroller=require('./Controller/AdminController')
const menucontroller=require('./Controller/menuController')
const usercontroller = require('./Controller/UserController')
const ordercontroller=require('./Controller/User_Ordercontroller')

const authorization=require('./function/auth')
const cors=require('./function/cors')

app.use(express.json())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))
app.use(cors)

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
        const login=await admincontroller.Admin_login(email,password)
        
        if(login){
            
            let token=await jsonwebtoken.sign({id:login.id},process.env.SECRET)
            res.setHeader('token',token)
            res.setHeader('id',login.id)
            
            res.status(200).json({message:'admin login',data:token})
            
        }
    }catch(error){
        res.status(500).json({message:'login failed'})
    }
})
app.post('/menu',authorization,async(req,res)=>{
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
app.post('/main/add',authorization,async(req,res)=>{
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
app.post('/main/pull',authorization,async(req,res)=>{
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
        if(login){
            {
              let token= await jsonwebtoken.sign({id:login.id},process.env.SECRET)
              res.setHeader('token',token)
              res.setHeader('id',login.id)
            //   res.setHeader('user_name',Login.user_name)
            //   res.setHeader('email', Login.email)
              
              
              
              res.status(200).json({message:"login successfully",data:token})
            }
        }
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
        const{user_id,table_no,main_dish,side_dish,appieteizer}=req.body
        const order=await ordercontroller.User_order(
            user_id,table_no,main_dish,side_dish,appieteizer
        )
        res.status(200).json({message:'order placed',data:order})
    }catch(error){
        res.status(500).json({message:'order not placed'})
    }
})
app.post('/order/place',async(req,res)=>{
    try{
        const{_id,main_course,amount,quantity}=req.body
        const order_place=await ordercontroller.User_Order(
            _id,main_course,amount,quantity
            )
        
        res.status(200).json({message:'order placed',data:order_place})
    }catch(error){
        res.status(500).json({message:'order failed'})
    }
})
app.post('/order/removed',async(req,res)=>{
    try{
        const{_id,main_course}=req.body
        const order_removed=await ordercontroller.User_order_delete(
            _id,main_course
            )
        
        res.status(200).json({message:'order placed',data:order_removed})
    }catch(error){
        res.status(500).json({message:'order failed'})
    }
})
app.post('/order/update',async(req,res)=>{
    try{
        const{_id,main_course,amount,quantity}=req.body
        const order_update=await ordercontroller.User_order_update(
            _id,main_course,amount,quantity
            )
        
        res.status(200).json({message:'order placed',data:order_update})
    }catch(error){
        res.status(500).json({message:'order failed'})
    }
})
app.post('/sidedish/order',async(req,res)=>{
    try{
        const{_id,side_course,amount,quantity}=req.body
        const side_order=await ordercontroller.Side_dish_order(
            _id,side_course,amount,quantity
        )
        res.status(200).json({message:'order placed',data:side_order})
    }catch(error){
        res.status(500).json({message:'side dish order failed'})
    }
})
app.post('/bill',async(req,res)=>{
    try{
        const{user_id,order_id}=req.body
        const Bill=new bill({
            user_id,order_id
        }).save()
        res.status(200).json({mmessage:'order bill',data:Bill})
    }catch(error){
        res.status(500).json({message:'bill not placed'})
    }
})
app.post('/bill/add',async(req,res)=>{
    try{
        const {_id,dish_name,amount,quantity}=req.body
        var total=amount * quantity
        const b_add=await bill.findOneAndUpdate({_id},
            {$push:{main_course:{
                dish_name,amount,quantity,total
            }}})
            res.status(200).json({message:'order bill',data:b_add})
    }catch(error){
        res.status(500).json({message:'bill not generated'})
    }
})
app.post('/side/add',async(req,res)=>{
    try{
        const {_id,side_name,amount,quantity}=req.body
        var total=amount * quantity
        const s_add=await bill.findOneAndUpdate({_id},
            {$push:{side_course:{
                side_name,amount,quantity,total
            }}})
            res.status(200).json({message:'order bill',data:s_add})
    }catch(error){
        res.status(500).json({message:'bill not generated'})
    }
})
app.post('/total/bill',async(req,res)=>{
    try{
        const {_id,side_course,main_course}=req.body
        total=Number(main_course) + Number(side_course)        
        const t_bill=await bill.findOneAndUpdate({_id},
            {$push:{total_amount:{
                side_course,main_course,total
            }}})
            res.status(200).json({message:' sir bill',data:t_bill})
    }catch(error){
        res.status(500).json({message:'bill not generated'})
    }
})
app.post('/just',async(req,res)=>{
    try{
        const ju=await user.findOne({})
        res.status(200).json({message:'success',data:ju})

    }
    catch(error){
        res.status(500).json({message:'failed'})
    }
})