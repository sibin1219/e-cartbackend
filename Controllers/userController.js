//import userSchema or model
const users = require('../Models/userSchema')
//import jwt token
const jwt = require('jsonwebtoken')

//2register logic
exports.register = async (req, res) => {
    
    //1 accepct data from client 
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            // If email exists, return an error
            return res.status(404).json("user already exists");
        }

        else {
            const newUser = new users({
                username,
                email,
                password,
                
            });
            await newUser.save();

            res.status(200).json(newUser)

        }

}
    catch (err) {
        res.status(404).json(err)
    }
}


//login logic
exports.login =async(req,res) =>{
    //accepct data from client
    const {email,password} = req.body
    try{
        //check if email and password in db
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWTKEY)//create token using jwt secret key -super2024
            console.log(token);
            
            res.status(200).json({existingUser,token})
        }else{
            res.status(402).json("Invalid email and password")
        }

    }
    catch(err){
        res.status(404).json(err)
    }
}