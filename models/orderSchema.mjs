import mongoose, { Schema } from "mongoose";

/*
 {
      "items": [
        {
          "title": "Samsung Universe 9",
          "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
          "price": 1249,
          "discountPercentage": 15.46,
          "rating": 4.09,
          "stock": 36,
          "brand": "Samsung",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          "images": [
            "https://i.dummyjson.com/data/products/3/1.jpg"
          ],
          "quantity": 1,
          "user": 1,
          "id": 1
        },
        {
          "title": "Infinix INBOOK",
          "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
          "price": 1099,
          "discountPercentage": 11.83,
          "rating": 4.54,
          "stock": 96,
          "brand": "Infinix",
          "category": "laptops",
          "thumbnail": "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
          "images": [
            "https://i.dummyjson.com/data/products/9/1.jpg",
            "https://i.dummyjson.com/data/products/9/2.png",
            "https://i.dummyjson.com/data/products/9/3.png",
            "https://i.dummyjson.com/data/products/9/4.jpg",
            "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
          ],
          "quantity": 1,
          "user": 1,
          "id": 2
        }
      ],
      "totalQuantity": 2,
      "totalAmount": 2348,
      "user": {
        "name": "amanullah",
        "email": "sarfarazaman38@gmail.com",
        "password": "12345678",
        "id": 1,
        "addresses": [
          {
            "email": "sarfarazaman38@gmail.com",
            "firstName": "amanullah",
            "lastName": "shaikh",
            "pinCode": 431001,
            "country": "India",
            "streetAddress": "aurangabad, sillod",
            "city": "aurangabad",
            "region": "maharashtra"
          },
          {
            "email": "sarfarazaman38@gmail.com",
            "firstName": "amanullah",
            "lastName": "shaikh",
            "pinCode": 431001,
            "country": "India",
            "streetAddress": "aurangabad, sillod",
            "city": "aurangabad",
            "region": "maharashtra",
            "phone": "8767837923"
          },
          {
            "email": "sarfaramamasan38@gmail.com",
            "firstName": "amanullah",
            "lastName": "shaikh",
            "pinCode": 431001,
            "country": "India",
            "streetAddress": "aurangabad, sillod",
            "city": "aurangabad",
            "region": "maharashtra",
            "phone": "9767837923"
          }
        ]
      },
      "paymentMethod": "card",
      "address": {
        "email": "sarfarazaman38@gmail.com",
        "firstName": "amanullah",
        "lastName": "shaikh",
        "pinCode": 431001,
        "country": "India",
        "streetAddress": "aurangabad, sillod",
        "city": "aurangabad",
        "region": "maharashtra",
        "phone": "8767837923"
      },
      "orderStatus": "cancel",
      "id": 1
    }
*/


// Define the schema for the "Item" within the "items" array
const itemSchema = new mongoose.Schema({
  delete: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
  quantity: {
    type: Number,
    required: true,
  },
});

// Define the schema for the "address" object within the main object
const addressSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
  },
  firstName: String,
  lastName: String,
  pinCode: Number,
  country: String,
  streetAddress: String,
  city: String,
  region: String,
  phone: String,
});

// Define the main schema for the entire object
const orderSchema = new mongoose.Schema({
  items: [itemSchema],
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model, if applicable
  },
  paymentMethod: String,
  address: addressSchema,
  orderStatus: {
    type: String,
    default: 'cancel'
  },
});


orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

orderSchema.set('toJSON', {
  virtuals: true, // Include virtuals when converting to JSON
  transform: (doc, ret) => {
    delete ret._id; // Remove the default '_id' field
  },
});

// Create the model
const Order = mongoose.model("Order", orderSchema);
// Export the Model
export default Order;