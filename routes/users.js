var express = require('express');
var router = express.Router();
let {products}=require('../controllers/products')
let {userSession,userWithSession}=require('../middleware/userValidateSession');
const {AddUser,findUser}=require('../controllers/userControllers')
const users = require('../model/users');
require('dotenv').config();

/* GET home page. */
router.get('/',userSession,(req, res)=>{
    res.redirect('/home');
});

router.get('/login',userWithSession,(req,res)=>{
    res.render('./user/login',{error:req.session.Err})
    req.session.Err=null;
})

router.post('/login',(req,res)=>{
   findUser(req.body).then((result)=>{
      req.session.user={
        id:result._id
      }
      res.redirect('/home');
   }).catch((err)=>{
    console.log(err);
    req.session.Err='Invalid User credentials'
    res.redirect('/login');
   })
})

router.get('/signUp',userWithSession,(req,res)=>{
    res.render('./user/signUp',{error:req.session.signErr})
    req.session.signErr=null;
})

router.post('/signUp',(req,res)=>{
  const {firstname,email,lastname,password}=req.body;
  try{
      users.findOne({email:email}).then((result)=>{
        if(!result){
          AddUser(req.body).then((user)=>{
          console.log(user)
            req.session.user={
              id:user._id
            }
            res.redirect('/home');
        }).catch((err)=>{
            req.session.signErr='something went wrong';
            res.redirect('/signUp');
          })
      }else{
          req.session.signErr='This email alredy exists';
          res.redirect('/signUp');
        }
    })
  }catch(err){
    console.log(err);
  }
})



// home page router 

router.get('/home',userSession, (req, res) => {
    res.render('./user/home',{products})
})

// logout section;

router.get("/logout",(req,res)=>{
  req.session.destroy()
 res.redirect("/login");
});


module.exports = router;
