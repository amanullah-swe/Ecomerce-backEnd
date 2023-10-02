import User from "../models/user.js";

export const adminRoleMiddleware = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (user.role !== 'admin') return res.status(401).json({ message: 'Authentication failed' });
        next();
    } catch (error) {
        // If the token is invalid or missing, send a 401 Unauthorized response
        return res.status(401).json({ message: 'Authentication failed' });
    }
};