import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/storeContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, cartItems]);

  const placeOrder = async (event) => {

    event.preventDefault();

    if (loading) return;

    try {

      setLoading(true);

      let orderItems = [];

      for (const itemId in cartItems) {

        if (cartItems[itemId] > 0) {

          const itemInfo = food_list.find(
            (product) => product._id === itemId
          );

          if (itemInfo) {
            orderItems.push({
              _id: itemInfo._id,
              name: itemInfo.name,
              price: itemInfo.price,
              quantity: cartItems[itemId]
            });
          }
        }
      }

      if (orderItems.length === 0) {
        alert("Cart is empty");
        setLoading(false);
        return;
      }

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2
      };

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("PAYMENT RESPONSE:", response.data);

      if (response.data.success) {

        const { session_url } = response.data;

        window.location.href = session_url;
      } else {
        alert("Payment Failed");
      }

    } catch (error) {
      console.log("PAYMENT ERROR:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>

      <div className="place-order-left">

        <p className="title">Delivery information</p>

        <div className="multi-field">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' />
        </div>

        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Email address' />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />

        <div className="multi-field">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder='City' />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
        </div>

        <div className="multi-field">
          <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder='ZipCode' />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
        </div>

        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' />

      </div>

      <div className="place-order-right">

        <div className="cart-total">

          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>

          <button type='submit' disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;