// Import necessary packages and modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User from '../models/user.js'



// Register route
export const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!name || !password || !email) return res.status(400).json({ message: 'validation failed' });
        // Check if the email is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'email already taken' });
        }
        // Hash the password before saving it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({ email, name, password: hashedPassword });
        await newUser.save();

        return res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Login route
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'validation fialed' });
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        // Set the JWT token as a cookie
        res.cookie('token', token, {
            path: '/', // Set the path to '/'
            httpOnly: true,
            maxAge: 3600000,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).json({ id: user._id, role: user.role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

//Lougout route
export const logout = async (req, res) => {
    // Set token to none and expire after 5 seconds
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res.status(200).json({ success: true, message: 'User logged out successfully' })
}
