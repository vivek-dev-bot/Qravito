import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
    try {

        const { itemId } = req.body;
        const userId = req.userId;   // ✅ from token

        const userData = await userModel.findById(userId);

        let cart = userData.cart || {};

        if (!cart[itemId]) {
            cart[itemId] = 1;
        } else {
            cart[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cart });

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
};

const removeFromCart = async (req, res) => {
    try {

        const { itemId } = req.body;
        const userId = req.userId;

        const userData = await userModel.findById(userId);

        let cart = userData.cart || {};

        if (cart[itemId] > 1) {
            cart[itemId] -= 1;
        } else {
            delete cart[itemId];
        }

        await userModel.findByIdAndUpdate(userId, { cart });

        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getCart = async (req, res) => {
    try {

        const userId = req.userId;

        const userData = await userModel.findById(userId);

        res.json({
            success: true,
            cart: userData.cart
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, removeFromCart, getCart };