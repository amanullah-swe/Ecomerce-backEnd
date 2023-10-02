import mongoose from "mongoose";

// Define the schema
const ProductSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minLength: 5,
        maxLength: 100,
        errorMessage: "Title must be between 5 and 100 characters long."
    },
    description: {
        type: String,
        minLength: 10
    },
    price: {
        type: Number,
        required: true,
        minimum: 0,
        errorMessage: "Price must be a number greater than or equal to 0."
    },
    discountPercentage: {
        type: Number,
        minimum: 0,
        maximum: 100,
        errorMessage: "Discount percentage must be between 0 and 100."
    },
    rating: {
        type: Number,
        minimum: 1,
        maximum: 5,
        errorMessage: "Rating must be between 1 and 5."
    },
    stock: {
        type: Number,
        required: true,
        minimum: 0,
        errorMessage: "Stock must be a number greater than or equal to 0."
    },
    brand: {
        type: String,
        minLength: 3,
        maxLength: 50,
        errorMessage: "Brand must be between 3 and 50 characters long."
    },
    category: {
        type: String,
        minLength: 3,
        maxLength: 50,
        errorMessage: "Category must be between 3 and 50 characters long."
    },
    thumbnail: {
        type: String,
        required: true,
        errorMessage: "Thumbnail is required."
    },
    images: {
        type: [String],
    },
    delete: {
        type: Boolean,
        default: false
    },
});

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true, // Include virtuals when converting to JSON
    transform: (doc, ret) => {
        delete ret._id; // Remove the default '_id' field
    },
});

ProductSchema.index(
    {
        id: 1,
        title: 1,
        description: 1,
        price: 1,
        stock: 1,
        brand: 1,
        category: 1,
    },
    { unique: true }
);
// Create the model
const Product = mongoose.model("Product", ProductSchema);
// Export the Model
export default Product;