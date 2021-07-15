const passport= require('passport');
const  jwt=require('jsonwebtoken');
module.exports.authenticate=(req,res,next)=>{

    passport.authenticate('local',(err,User,info)=>{
        if(err){
            return res.status(401).json(info);
        } 
        else if(User){
            const user = {
                id: User.id,
                email: User.email,
                role:User.role,
                first_name: User.first_name,
                last_name: User.last_name,
                hub: User.hub,
                branch: User.branch,
                region: User.region,

              };
              /* console.log(user); */
            res.cookie("token",jwt.sign(
                {user:user,
                "iat": (new Date().getTime()/1000)},
                process.env.JWT_SECRET,
                {expiresIn:process.env.JWT_EXP}
                
            ),{
                maxAge: 12* 60 * 60 * 1000,
                secure: 'false',
                sameSite:'none',
                httpOnly:'true'
            });
            res.status(200).json({"message":"successfully logged in","user":user});
/*             return res.status(200).json({"token":jwt.sign(
                {user:user},
                process.env.JWT_SECRET,
                {expiresIn:process.env.JWT_EXP}
                
            )}); */
        }else{
            return res.status(401).json(info);
        }
    })(req,res);
}
