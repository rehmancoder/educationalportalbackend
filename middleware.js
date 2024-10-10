import jwt from "jsonwebtoken"

export default function authenticateToken (req, res, next) {
    const token = req.headers.authtoken; // Get token from cookies
    console.log(token);
    console.log("middle charsi");
    if (!token) {
        return res.status(401).send('No token found'); // Unauthorized if no token found
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token'); // Forbidden if token is invalid
        }
        req.user = user; // Store user information in request
        next();
    });
};