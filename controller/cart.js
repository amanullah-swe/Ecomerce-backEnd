import Cart from "../models/cartSchema.js";


//CREATE
export const createCartItem = async (req, res) => {
    const { product, user, quantity } = req.body;

    // Validate the required fields
    if (!product || !user || !quantity) {
        return res.status(400).json({
            success: false,
            error: "Product, user, and quantity are required fields."
        });
    }

    try {
        const item = new Cart({ product, user, quantity });
        const savedItem = await item.save();
        const populateItems = await Cart.findById(savedItem.id).populate('user').populate('product').exec();

        res.status(200).json({
            success: true,
            data: populateItems
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


//READ
export const readCartItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Cart.findById(id).populate('user').populate('product').exec();
        if (!item) {
            res.status(404).send("item not found.");
        } else {
            res.status(200).send(item);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

export const readAllCartItemsByUseraId = async (req, res) => {
    const user = req.userId;
    try {
        const items = await Cart.find({ user }).populate('user').populate('product').exec();
        if (!items) {
            res.status(404).send("not items in the cart or else  went wrong");
        } else {
            res.status(200).send(items);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}



//UPDATE
export const updateCartItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { user, product, quantity } = req.body;
        const item = { user: user.id, product: product.id, quantity };
        console.log(item);
        const updatedItem = await Cart.findByIdAndUpdate(id, item, { new: true }).populate('user').populate('product').exec();
        if (!updatedItem) {
            res.status(404).send("item not found.");
        } else {
            res.status(200).send(updatedItem);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//DELETE
export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Cart.findOneAndDelete(id);
        if (!deletedItem) {
            res.status(404).send("item not found.");
        } else {
            res.status(200).send(deletedItem);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

