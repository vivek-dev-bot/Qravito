import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const url = "http://localhost:4000";

    const [food_list, setFoodlist] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [loading, setLoading] = useState(false);


    const addToCart = async (itemId) => {

        setCartItems((prev = {}) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/add",
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const removeFromCart = async (itemId) => {

        setCartItems((prev = {}) => {

            const newQty = (prev[itemId] || 0) - 1;

            if (newQty <= 0) {
                const updated = { ...prev };
                delete updated[itemId];
                return updated;
            }

            return {
                ...prev,
                [itemId]: newQty
            };
        });

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getTotalCartAmount = () => {

        let total = 0;

        for (const itemId in cartItems) {

            const itemInfo = food_list.find(
                (product) => product._id === itemId
            );

            if (itemInfo) {
                total += itemInfo.price * cartItems[itemId];
            }
        }

        return total;
    };

    const fetchFoodList = async () => {
        try {
            setLoading(true);
            const res = await axios.get(url + "/api/food/list");
            setFoodlist(res.data.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadCartData = async (savedToken) => {
        try {
            const res = await axios.post(
                url + "/api/cart/get",
                {},
                { headers: { token: savedToken } }
            );

            console.log("Cart Response:", res.data);

            setCartItems(res.data.cart || {});
        } catch (error) {
            console.log(error);
            setCartItems({});
        }
    };

    useEffect(() => {

        const loadData = async () => {

            await fetchFoodList();

            if (token) {
                await loadCartData(token);
            }
        };

        loadData();

    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        loading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;