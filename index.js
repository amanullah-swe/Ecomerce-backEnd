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
import multer from 'multer'
import path from 'path'
import { upload } from './middleware/multerMidelWare.js';
import { fileURLToPath } from 'url';

const app = express()
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/tmp', express.static(path.join(__dirname, '/tmp')));


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

// Derive __dirname from import.meta.url



// for testing only 
// app.post('/upload', upload.array('image', 5), (req, res) => {
//     // console.log('Request Body:', req.body); // Access other form data
//     // console.log('Uploaded File:', req.file); // Access uploaded file
//     const imagesResponse = [];
//     if (req.files && req.files.length > 0) {
//         const uploadedFiles = req.files.map(file => `uploads/${file.filename}`);

//         const Tempres = {
//             success: true,
//             message: 'Files uploaded!',
//             files: uploadedFiles,
//             formData: req.body // Include other form data in the response
//         }
//         imagesResponse.push(Tempres);
//         res.status(200).json(imagesResponse);
//     } else {
//         res.status(400).json({ success: false, message: 'No files uploaded or invalid file type!' });
//     }
// });

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