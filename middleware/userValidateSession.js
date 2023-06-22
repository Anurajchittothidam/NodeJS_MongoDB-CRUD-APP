let userSession=(req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/login');
    }
}

let userWithSession=(req,res,next)=>{
    if(req.session.user){
        res.redirect('/home');
    }else{
        next()
    }
}

module.exports={userSession,userWithSession};