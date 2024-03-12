const jwt = require("jsonwebtoken");

// Function to verify token
function TokenVerify(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; 
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

// Middleware to verify if the user is a superadmin
const isSuperAdmin = (req, res, next) => {
    const token = req.headers.token ? req.headers.token.split(' ')[1] : null;
    try {
        if (!token) {
            throw new Error('Token not provided');
        }
        const decoded = TokenVerify(token);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        if (decoded.role === 'superadmin') {
            req.user = decoded; 
            return next();
        }
        return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: `Unauthorized catch: ${error.message}` });
    }
};

module.exports = { TokenVerify, isSuperAdmin };
