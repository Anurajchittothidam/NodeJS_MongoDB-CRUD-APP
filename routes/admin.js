const express = require('express');
const router = express.Router();
let {findAllUser,deleteWithId, findWithName}=require('../controllers/adminControllers');
const { AddUser } = require('../controllers/userControllers');
let {adminSession}=require('../middleware/validateAdminSession')
let user=require('../model/users')

router.get('/',adminSession, (req,res)=>{
    res.redirect('/admin/dashboard')
})

router.get('/login',(req,res)=>{
    if(req.session.admin){
        res.redirect('/admin/dashboard')
    }else{
        res.render('./admin/login',{error:req.session.loginErr})
        req.session.loginErr=null;
    }
})

router.post('/login',(req,res)=>{
    const {password,username}=req.body
    const passwordDB=process.env.DB_PASSWORD
    const usernameDB=process.env.DB_USERNAME
    if(password===passwordDB && usernameDB===username){
        req.session.admin=req.body.username
        res.redirect('/admin/dashboard')
    }else{
        req.session.loginErr='User Name or Password is incorrect'
        res.redirect('/admin/login')
    }
})

router.get('/dashboard',adminSession, async (req,res)=>{
    let users= await findAllUser()
    let index=0;
    res.render('./admin/dashboard',{index,users,message:(users.length>0)?null:'no user found'});
})

router.get('/addUser',adminSession, (req,res)=>{
    res.render('./admin/addUser',{error:req.session.addErr})
    req.session.addErr=null;
})

router.post('/addUser',(req,res)=>{
    const{firstname,lastname,email,password}=req.body;
    try{
        user.findOne({email:email}).then((result)=>{
            if(!result){
                AddUser(req.body).then((user)=>{
                    if(user){
                        req.session.addErr='User added successfully'
                        res.redirect('/admin/addUser');
                    }else{
                        req.session.addErr='failed to add user'
                        res.redirect('/admin/addUser')
                    }
                }).catch((err)=>{
                    req.session.addErr='something went wrong'
                    res.redirect('/admin/addUser');
                })
            }else{
                req.session.addErr='Email alredy taken'
                res.redirect('/admin/addUser');
            }
        })
       
    }catch(err){
        console.log(err) 
    }
    
})


router.get('/editUser/:id',(req,res)=>{
    user.find({_id:req.params.id}).then((user)=>{
        res.render('./admin/editUser',{id:req.params.id,user:user[0],error:req.session.Err})
    })
})

router.post('/editUser/:id',(req,res)=>{
    let id=req.params.id;
    user.updateOne({_id:id},{$set:{...req.body}}).then(user)
    if(user){
       res.redirect('/admin/dashboard')
        
    }else{
        req.session.Err='Update failed'
    }
    
})


router.get('/deleteUser/:id',adminSession,(req,res)=>{
    deleteWithId(req.params).then(()=>{
        res.redirect('/admin/dashboard')
    }).catch((err)=>{
        res.redirect('/admin/dashboard');
    }) 
})

router.get('/searchUser',adminSession,async(req,res)=>{
    let users=await findWithName(req.query);
    let index=0;
    res.render('./admin/dashboard',{index,users,message:(users.length>0)?null:'no users found'})
})

router.get('/signout',(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/login');
})

module.exports = router;
