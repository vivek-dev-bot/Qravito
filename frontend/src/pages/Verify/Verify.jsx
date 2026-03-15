import React, { useContext, useEffect } from 'react'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
        const success = searchParams.get("success")
        const orderId = searchParams.get("orderId")

        const {url, token} = useContext(StoreContext)
        const navigate = useNavigate()

      const verifPayment = async () => {
    try {

        console.log("success:", success);
        console.log("orderId:", orderId);

        const response = await axios.post(
            url + "/api/order/verify",
            { success, orderId },
            { headers: { token } }
        );

        console.log(response.data);

        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }

    } catch (error) {
        console.log(error);
        navigate("/");
    }
}

        useEffect(() => {
            verifPayment();
        }, [])
        
  return (
    <div className='verify'>
        <div className="spinner"></div>
      
    </div>
  )
}

export default Verify
