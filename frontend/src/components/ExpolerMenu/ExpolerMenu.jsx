import React from 'react'
import './ExpolerMenu.css'
import { menu_list } from '../../assets/assets.js'

const ExpolerMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore out menu</h1>
      <p> Dummy   Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy  Dummy </p>
        <div className="explore-menu-list">
            {menu_list.map((item,index) => {
                 return(
                    <div onClick={() => setCategory(prev => prev ===item.menu_name ? "All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category === item.menu_name ? "active" :""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                 )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExpolerMenu
