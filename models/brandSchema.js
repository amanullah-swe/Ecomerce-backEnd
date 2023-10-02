import mongoose from "mongoose";


// {
//     "value": "Apple",
//     "label": "Apple",
//     "checked": false
//   },
// Define the schema
const BrandSchema = new mongoose.Schema({
    value: {
        required: true,
        type: String,
        minLength: 3,
        errorMessage: "Title must be minimus 3 characters long."
    },
    label: {
        required: true,
        type: String,
        minLength: 3,
        errorMessage: "Title must be minimus 3 characters long."
    },
    checked: {
        type: Boolean,
        default: false
    },
});

BrandSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

BrandSchema.set('toJSON', {
    virtuals: true, // Include virtuals when converting to JSON
    transform: (doc, ret) => {
        delete ret._id; // Remove the default '_id' field
    },
});

// Create the model
const Brand = mongoose.model("Brand", BrandSchema);
// Export the Model
export default Brand;