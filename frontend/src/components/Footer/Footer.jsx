import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets.js'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                    <p>
                    Our mission is to make food ordering easy, fast, and enjoyable. From fresh ingredients to quick 
                    delivery, we ensure every order brings happiness and great taste to your doorstep.
                    </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
                
            </div>
            <div className="footer-content-right">
                <h2>GEET IN TOUCH</h2>
                <ul>
                    <li>+1-122-456-454</li>
                    <li>vivek@gogle.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">copywrite[2016] [Tamato] All Rights Reserved</p>
    </div>
  )
}

export default Footer
