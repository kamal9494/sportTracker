const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    try{
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "authorization denied"
            });
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY);

        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = verifyToken