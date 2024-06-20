import { mongooseConnect } from "@/lib/mongoose";
import { buffer } from 'micro'
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = "whsec_2c5f75714b3af864b6f1013eebb80e1fb67c9387f706e3593360011d48aa558b";

export default async function handler(req, res){
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            console.log(data);
            const paid = data.payment_status === 'paid';
            if(orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {
                    paid: true,
                })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok');
}

export const config = {
    api: {bodyParser: false}
};

//acct_1PTDpII5nq7ZzJ3o
//master-boom-evenly-vivid //expires in 90 days? 6/19
