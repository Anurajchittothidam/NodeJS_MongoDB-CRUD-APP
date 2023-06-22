const user=require('../model/users');


function findAllUser() {
    return new Promise((resolve, reject) => {
        try {
            user.find().then((result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        } catch (err) {
            reject(err);
        }
    }).catch((err_1) => {
        reject(err_1);
    });
}

function deleteWithId({id}){
    return new Promise((resolve,reject)=>{
        user.deleteOne({_id:id}).then((users)=>{
            resolve(users)
        }).catch((err)=>{
            reject(err);
        })
    })
}

function findWithName({firstname}){
    return new Promise ((resolve,reject)=>{
       try{
        user.find({$or:[{email:new RegExp(firstname)},{firstname:new RegExp(firstname)}]}).then((user)=>{
            if(user){
                resolve(user)
            }else{
                reject()
            }
        }).catch((err)=>{
            reject(err);
        })
       }catch(err){
        reject(err)
       }
    })
}



module.exports={deleteWithId,findAllUser,findWithName};
