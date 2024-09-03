import jwt from "jsonwebtoken";

export const verifyToken=(req,res, next)=>{

    // received token
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json("You are not an authorized user or authenticated")
    } 

    // checking received and having token in env
    jwt.verify(token,process.env.JWT, (err, user)=>{
        if(err){
            return res.status(401).json("You are not authenticated")
        }
        req.user = user
        next()
    })
}


export const verifyAdmin=(req,res, next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin===1){
            next()
        }else{
            return res.status(404).json("you are not authorized admin")
        }
    })
}

export const verifyUser=(req,res, next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===parseInt(req.params.id)||req.user.isAdmin===1){
            next()
        }else{
            return res.status(404).json("you are not authorized")
        }
    })
}