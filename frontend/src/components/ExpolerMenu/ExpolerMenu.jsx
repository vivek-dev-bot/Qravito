import React from "react";
import "./ExpolerMenu.css";
import { menu_list } from "../../assets/assets";

const ExpolerMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Discover a wide variety of delicious dishes crafted with fresh ingredients and rich flavors.
        From quick snacks to full meals, find your favorite food and enjoy fast and easy ordering.
      </p>

      <div className="explore-menu-wrapper">
        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div key={index} onClick={() =>
                setCategory((prev) => prev === item.menu_name ? "All" : item.menu_name
                )}
              className="explore-menu-list-item">
              <img src={item.menu_image} alt=""
                className={category === item.menu_name ? "active" : ""}/>
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>

      <hr />
    </div>
  );
};

export default ExpolerMenu;