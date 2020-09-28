const jwt=require('jsonwebtoken')
const User=require('../../models/user/user')

const auth= async(req,res,next)=>{
    try{
        const token = req.cookies['auth_token']
        const decoded=jwt.verify(token,'thisismyjwtsecret')
        
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.user=user
        req.token=token
        next()
    }catch(e){
        res.redirect('/')
        // res.status(401).send('You are not logged in!!')
    }
}

module.exports=auth