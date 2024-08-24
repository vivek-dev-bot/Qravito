import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.data.success) {
        setData(response.data.data || [])
      } else {
        setData([])
      }
    } catch (err) {
      console.log(err)
      setData([])
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">

        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />

            <p>
              {order.items?.map((item, i) =>
                i === order.items.length - 1
                  ? item.name + " X " + item.quantity
                  : item.name + " X " + item.quantity + ", "
              )}
            </p>

            <p>₹{order.amount}.00</p>
            <p>Items: {order.items?.length || 0}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
            <button>Track order</button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default MyOrders