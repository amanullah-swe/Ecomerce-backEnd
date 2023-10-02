const dotenv = require('dotenv');
dotenv.config();
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_END_POINT_SECRET;
const FRONT_END_DOMAIN = process.env.FRONT_END_DOMAIN;
const stripe = require('stripe')(process.env.STRIPE_PACKAGE_KEY);

module.exports.stripeCheckout = async (req, res) => {
    try {
        const OrderModule = await import('../models/orderSchema.mjs')
        const Order = OrderModule.default;
        const order = req.body.order;
        const newOrder = new Order(order);
        const savedOrder = await newOrder.save();
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        unit_amount: order.totalAmount * 100,
                        product_data: {
                            name: 'Amount',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: FRONT_END_DOMAIN + "order-success?orderId=" + savedOrder._id,
            cancel_url: FRONT_END_DOMAIN + "order-cancell",
            metadata: {
                saved_order_id: JSON.stringify(savedOrder._id),
                aman: 'amanullah'
            },
            expires_at: Math.floor(Date.now() / 1000) + (3600 * 0.5), // 7 days in milliseconds
        });
        console.log("order sucees");
        res.status(200).send({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(504).send({ error: 'sever error' });
    }
}


module.exports.stripeWebHook = async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.log(err);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    // payment_intent.failed
    // checkout.session.expired
    // checkout.session.completed
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                break;
            case 'payment_intent.failed':
                break;
            case 'checkout.session.completed':
                console.log('checkout.session.completed');
                console.log(event.data.object.metadata);
                break;
            case 'checkout.session.expired':
                console.log('checkout.session.expired');
                const order = event.data.object.metadata;
                const stringValue = order.saved_order_id.replace(/"/g, '');
                await Order.findByIdAndDelete(stringValue);
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.log(error);
    }


    // Return a 200 response to acknowledge receipt of the event
    response.send();
}

