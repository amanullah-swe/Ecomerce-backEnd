import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import Product from "./models/productShema.js";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import productRouter from './routes/product.js'
import brandRouter from './routes/brands.js'
import catogryRouter from './routes/catogry.js'
import cartRouter from './routes/cart.js'
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'
import authRouter from './routes/auth.js';
import paymentRoute from './routes/payments.mjs'

const app = express()
const port = process.env.PORT;



main();
async function main() {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL);
        console.log('connection successfull');

    }
    catch (error) {
        console.log(error);
    }
}

/*MIDDLEWARE CONFIG */
app.use(cookieParser());
app.use(morgan("dev"));
const corsOptions = {
    origin: [process.env.CROS_ORINGIN_ULR1, process.env.CROS_ORINGIN_ULR2],
    credentials: true,
    exposedHeaders: 'Authorization, Content-Type, X-Total-Count',
};
app.use(cors(corsOptions));

// Set up storage engine using multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable with multer settings
const upload = multer({
    storage: storage,
    limits: { fileSize: 50000000 * 100 }, // 50MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type function
function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Invalid file type!');
    }
}
// Route to handle file upload along with other data
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Request Body:', req.body); // Access other form data
    console.log('Uploaded File:', req.file); // Access uploaded file

    if (req.file) {
        res.status(200).json({
            success: true,
            message: 'File uploaded!',
            file: `uploads/${req.file.filename}`,
            formData: req.body // Include other form data in the response
        });
    } else {
        res.status(400).json({ success: false, message: 'No file uploaded or invalid file type!' });
    }
});






app.get('/', (req, res) => {
    res.send({ messagge: 'success' });
})
app.use('/payment', paymentRoute);
app.use(express.json());
app.use('/products', productRouter);
app.use('/brands', brandRouter);
app.use('/categories', catogryRouter);
app.use('/cart', cartRouter);
app.use("/users", userRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);



app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    // try {
    //     await Product.insertMany(products)
    //     console.log('succesfully inserted');
    // } catch (error) {
    //     console.log(error);
    // }

})