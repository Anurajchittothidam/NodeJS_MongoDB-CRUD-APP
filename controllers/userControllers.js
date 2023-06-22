const { resolve } = require('path');
let users=require('../model/users');
let bcrypt=require('bcrypt');
const { rejects } = require('assert');
const { stat } = require('fs');

const AddUser =({firstname,lastname,email,password})=>{
    return new Promise((resolve, reject)=>{
                bcrypt.hash(password, 10).then(async (result) => {
                    try{
                        password=result;
                        const newUser= await users({
                            firstname,
                            lastname,
                            email,
                            password
                        })
                        resolve(newUser.save());
                    } catch(err){
                        reject(err);
                    }
                }).catch((err)=>{
                    reject(err);
                })
    }).catch((err)=>{
        console.log(err);
    })   
}

const findUser=({email,password})=>{
    return new Promise((resolve,reject)=>{
        try{
            users.findOne({email:email}).then((user)=>{
                if(user){
                    bcrypt.compare(password,user.password).then((result)=>{
                        if(result){
                            resolve(user)
                        }else{
                            reject()
                        }
                    }).catch((err)=>{
                        reject(err);
                    })
                }else{
                    reject()
                }
            })
            
        }catch(err){
            reject(err);
        }
    })
}



module.exports={AddUser,findUser}