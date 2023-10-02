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
console.log(corsOptions.origin)
app.use(cors(corsOptions));

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