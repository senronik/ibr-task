const jwt = require('jsonwebtoken');

const verifyAdmin= async (req,res,next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const jwtKey = process.env.SECRET_KEY;
    if(!token){
        return res.status(401).json({error:"Token not found"});
    }
    if(req.headers.role === 'admin'){
        jwt.verify(token , jwtKey , (error,decoded)=>{
            if(error){
                return res.status(401).json({error:"Authentication Failed"})
            }
            req.userId = decoded.userId;
            next();
        })
    }else{
        return res.status(401).json({error:"Admin Authentication Failed"});
    }
}
module.exports = verifyAdmin;