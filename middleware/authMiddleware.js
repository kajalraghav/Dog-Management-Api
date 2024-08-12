const jwt = require('jsonwebtoken');
const User = require("../models/user");
const dotenv = require('dotenv');

dotenv.config();

module.exports = async (req, res, next) => {
    // Check if token is provided in the request header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized',
            message: 'No token found, authorization denied'
        });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to the request object
        req.user = decoded.user;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle cases where the token is invalid or expired
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 401,
                error: 'Unauthorized',
                message: 'Token has expired, please login again'
            });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 401,
                error: 'Unauthorized',
                message: 'Token is not valid, authorization denied'
            });
        } else {
            return res.status(500).json({
                status: 500,
                error: 'Internal Server Error',
                message: 'An error occurred while verifying the token'
            });
        }
    }
};
