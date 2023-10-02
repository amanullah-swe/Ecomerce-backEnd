import Order from "../models/orderSchema.mjs";

//CREATE
export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        const response = await Order.findById(savedOrder._id).populate('user').exec();
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

//READ
export async function readAllOrdersByfilter(req, res) {
    const { _page = 1, _limit = 10, _sort, _order } = req.query;
    const query = { [_sort]: _order }
    try {
        // Apply the filter
        const orders = await Order.find().sort(query || {}).skip((_page - 1) * _limit || 0).limit(_limit || {}).populate('user').populate('items').exec();
        const totalOrders = await Order.countDocuments();
        res.set('X-Total-Count', totalOrders);
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
}

export const readAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').exec();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }

}

export const readAllOrdersByUserId = async (req, res) => {
    const { userId } = req;
    try {
        if (!userId) return res.status(400).json({ error: "the bad request" })
        const orders = await Order.find({ user: userId }).populate('user').exec();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error, userId);
        res.status(500).json({ error: 'An error occurred while fetching orders by user ID.' });
    }
}


export const readOrderByOrderId = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId).populate('user').exec();
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching order by order ID.' });
    }
}



//UPDATE
export const updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const orderData = req.body;
    // console.log(orderId);
    // console.log(orderData);
    const newOrderData = {
        totalQuantity: orderData.totalQuantity,
        totalAmount: orderData.totalAmount,
        user: orderData.user.id,
        items: orderData.items,
        paymentMethod: orderData.paymentMethod,
        address: orderData.address,
        orderStatus: orderData.orderStatus
    }
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, newOrderData, { new: true }).populate('user').exec();
        res.json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the order.' });
    }
};

//DELETE
export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findOneAndDelete(id);
        if (!deletedProduct) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send({ message: 'user deleted' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

