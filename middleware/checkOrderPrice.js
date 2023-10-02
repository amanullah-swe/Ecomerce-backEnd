import Product from "../models/productShema.js";


export const checkOrderPrice = async (req, res, next) => {
    const { order } = req.body;
    if (order.items) {
        const newItems = [];
        for (const item of order.items) {
            const newItem = await Product.findById(item.id);
            const newItem2 = { ...newItem._doc, quantity: item.quantity };
            newItems.push(newItem2);
        }
        const totalAmount = newItems.reduce((totalAmount, item) => (item.quantity * item.price + totalAmount), 0);
        const totalQuantity = newItems.reduce((Quantity, item) => (item.quantity + Quantity), 0);
        const newOrder = {
            items: newItems,
            totalQuantity,
            totalAmount,
            paymentMethod: order.paymentMethod,
            user: order.user,
            address: order.address

        }
        next();
    } else {
        res.status(504).send({ error: "invilid order" });
    }

    /* {
         items: [ '64f08c534fd73b8ee19637cc' ],
         totalQuantity: 1,
         totalAmount: 899,
         user: '65046df75b3816e3486be58b',
         paymentMethod: 'cash',
         address: {
           email: 'sarfarazaman38@gmail.com',
           firstName: 'amanullah',
           lastName: 'shaikh 5',
           pinCode: 431001,
           country: 'India',
           streetAddress: 'aurangabad, sillod',
           city: 'aurangabad',
           region: 'maharashtra',
           phone: '0876737923',
           _id: '65047b690f92aa61140de872'
         }
       }
       */
}