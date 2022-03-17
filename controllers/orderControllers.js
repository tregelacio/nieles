// Order controller handles the viewing of all the orders,
// allows placement of all orders and handle payments via Stripe

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const config = require('config');
const stripe = require('stripe')(config.get('StripeAPIKey'));

// Retrieves orders associated with a certain userId
// Sort them in order by date and return orders in JSON
module.exports.get_orders = async (req, res) => {
    const userId = req.params.id;
    Order.find({ userId }).sort({ date: -1 }).then(orders => res.json(orders));
}

// Checkout function
// Retrieve cart and user by userId, then get the email of the user
// Check whether the cart exists or not. No cart means we send back a response saying no cart
// Then, create a charge with Stripe
// If charge doesn't work, throw an error. If charge works, create a new order userId, items from cart and bill from cart's items
// Then delete cart using cartId and send order as a response to the frontend.
module.exports.checkout = async (req, res) => {
    try {
        const userId = req.params.id;
        const { source } = req.body;
        let cart = await Cart.findOne({ userId });
        let user = await User.findOne({ _id: userId });
        const email = user.email;
        if (cart) {
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'inr',
                source: source,
                receipt_email: email
            })

            if (!charge) throw Error('Payment failed');
            if (charge) {
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                });
                const data = await Cart.findByIdAndDelete({ _id: cart.id });
                return res.status(201).send(order);
            }
        } else {
            res.status(500).send("You do not have items in cart");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}