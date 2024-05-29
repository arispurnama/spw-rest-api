import jwt from "jsonwebtoken"
const jwtSecret = "9fdba4617683cc4ae6e685293bccf7692a8be1591c6d6f2920a442aa719d038499fa09";

export const verifyToken = async (req, res, next) =>{
    let response = new Object();
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        console.log(token)
        var tokenRep = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenRep, jwtSecret);
        next();
    } catch (error) {
        console.log(error)
        response.error = true;
        response.errorMessage = 'Invalid token'
        res.status(401).json({ response });
    }
};