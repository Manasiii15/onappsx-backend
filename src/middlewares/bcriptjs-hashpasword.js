import bcrypt from 'bcryptjs';


async function hashPassword(req,res,next){
    const data = req.body;
    const {name,email,password} = data
   
        const hash = await bcrypt.hashSync(password, 8);
        req.body = {
            name: name,
            email: email,
            password: hash
        };
        next()
}


export default hashPassword