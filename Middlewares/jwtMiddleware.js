const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    try{
   //get the token
   const token = req.headers['authorization'].slice(7)
   console.log(token);
   //verify the token
   const jwtResponse = jwt.verify(token,process.env.JWTKEY)
   console.log(jwtResponse);//payload -useid
   req.payload = jwtResponse.userId
   next();
    }
    catch(err){
        res.status(402).json("AuthorizationError")
    }
}

module.exports = jwtMiddleware