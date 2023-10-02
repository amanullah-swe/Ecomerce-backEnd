import mongoose, { Schema } from "mongoose";

// Define the schema

/*
    {
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 50,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ],
      "quantity": 1,
      "user": 1,
      "id": 1
    }
 */
const cartSchema = new mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: {
        type: Number,
        default: 1
    },
});

cartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cartSchema.set('toJSON', {
    virtuals: true, // Include virtuals when converting to JSON
    transform: (doc, ret) => {
        delete ret._id; // Remove the default '_id' field
    },
});

// Create the model
const Cart = mongoose.model("Cart", cartSchema);
// Export the Model
export default Cart;