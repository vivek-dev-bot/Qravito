import { orderModel } from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import mongoose from "mongoose";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placeing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174"

    try {
const newOrder = new orderModel({
    userId: req.userId,
    items: req.body.items,
    amount:req.body.amount,
    address: req.body.address
})

await newOrder.save();

await userModel.findByIdAndUpdate(req.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivet Chnarges"
                },
                unit_amount: 2*100
            },
            quantity:1
        })

const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: line_items,

    customer_email: req.body.address.email,
    billing_address_collection: 'required',

    success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
});

        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Payment failed"})
        
    }
}



const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body;   // ✅ FIX

    try {

        if (success === "true") {

            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true },
                { new: true }
            );

            console.log("Updated Order:", updatedOrder);

            if (!updatedOrder) {
                return res.json({ success: false });
            }

            return res.json({ success: true });

        } else {

            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false });

        }

    } catch (error) {

        console.log(error);
        res.json({ success: false });

    }
};

const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({userId:req.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error user orders"})
        
    }
}

const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

// api for upadting order status
const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:"status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"})
        
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}