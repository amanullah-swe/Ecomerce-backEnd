import mongoose from "mongoose";

// Define the schema

/*
{
      "name": "amanullah",
      "email": "esmamanyt@gmail.com",
      "password": "12345678",
      "role": "user",
      "addresses": [
        {
          "email": "esmamanyt@gmail.com",
          "firstName": "amanullah",
          "lastName": "shaikh",
          "pinCode": 431001,
          "country": "India",
          "streetAddress": "aurangabad, sillod",
          "city": "aurangabad",
          "region": "maharashtra",
          "phone": "1234567890"
        },
        {
          "email": "amaan.swe@gmail.com",
          "firstName": "amanullah",
          "lastName": "shaikh",
          "pinCode": 431001,
          "country": "India",
          "streetAddress": "aurangabad, sillod",
          "city": "aurangabad",
          "region": "maharashtra",
          "phone": "0876783792"
        }
      ],
    },
*/
const addressSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    pinCode: Number,
    country: String,
    streetAddress: String,
    city: String,
    region: String,
    phone: String,
});

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: 4,
        maxLength: 100,
        errorMessage: "Title must be between 5 and 100 characters long."
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        errorMessage: "Password must be 8 or more than 8 characters long."
    },
    role: {
        type: String,
        default: 'user'
    },
    profileImage: String,
    addresses: [addressSchema],
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true, // Include virtuals when converting to JSON
    transform: (doc, ret) => {
        delete ret._id; // Remove the default '_id' field
    },
});

const User = mongoose.model("User", userSchema);
// Export the Model
export default User;