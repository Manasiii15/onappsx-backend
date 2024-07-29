import jwt from "jsonwebtoken";


async function tokenGenerator(payload){
    const token = await jwt.sign(payload,process.env.JWT_SIGN);
    return token;
}

async function tokenVerify(token){
    
        const tokenVerify = await jwt.verify(token,process.env.JWT_SIGN)
        return tokenVerify;
  
}


export default{
    tokenGenerator,
    tokenVerify
}