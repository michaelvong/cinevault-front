import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){
    if(req.method !== 'POST') {
        res.json('should be POST request');
        return;
    }
    //products is a string of ids joined by comma
    const {name, email, city, postalCode, address, country, cartProducts} = req.body;
    await mongooseConnect();
    const productsIds = cartProducts;
    //use spread operator to create an array from a set of ids
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});

    let line_items = [];
    for(const prodId of uniqueIds) {
        const prodInfo = productsInfos.find(p => p._id.toString() === prodId);
        const quantity = productsIds.filter(id => id === prodId)?.length || 0;
        if(quantity > 0 && prodInfo){
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name:prodInfo.title,
                    },
                    unit_amount: prodInfo.price * 100,
                }
            });
        }
    }

    const orderDoc = await Order.create({
        line_items,name,email,city,
        postalCode,country,address,
        paid:false,
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?sucess=true',
        cancel_url: process.env.PUBLIC_URL + '/cart?cancel=true',
        metadata: {
            orderId: orderDoc._id.toString(),
        },
    });
    //res.json(line_items); //works
    res.json({
        url: session.url,
    })
}