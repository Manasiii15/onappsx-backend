import tokenVerify from "../utils/token-generater.js";



async function userverify(req,res,next){
    try {
        const token = req.query.token;
        const data = req.body
        if(token){
            const userdetails = await tokenVerify.tokenVerify(token);
            
            req.body = {
                email: userdetails.email,
                id: userdetails.id,
                bodydata : data
            }
            next()
         }
        
    } catch (error) {
      console.log(error);
      res.status(401).json({message:"user not verify"})  
    }
}


export default userverify;