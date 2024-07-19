import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// Middleware function to check authentication
export const authMiddleware = (req, res, next) => {

    try {
        // Get the token from the cookie (assuming you're using cookie-parser)
        const token = req.cookies.token;
        console.log("checking ====== ", token);
        // Verify the token using your secret key
        const decoded = jwt.verify(token, 'your-secret-key');
        // If the token is valid, set the user ID in the request object
        req.userId = decoded.userId;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // console.log(error);
        // If the token is invalid or missing, send a 401 Unauthorized response
        return res.status(401).json({ message: "Authencation failed pleas login", error });
    }
};
