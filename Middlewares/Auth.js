import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';

export const Authenticated = async (req, res, next) => {
    const token = req.header("Auth");

    if (!token) {
        return res.status(401).json({ message: "Login First" });
    }

    try {
        const decoded = jwt.verify(token, '@$#%&hkjkhj465)(^%%^%#');
        const id = decoded.userId;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Save the current login user id/details
        next();
    } catch (error) {
        // Handle different types of errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        } else {
            // For any other errors, return a generic message
            return res.status(500).json({ message: "Server error" });
        }
    }
};
