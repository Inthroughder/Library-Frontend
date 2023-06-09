import React from "react";
import "../css/popup.css"
import image from "../img/hahafunny.jpg"
export const Popup = ({ closePopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <h1>debil</h1>
      <button onClick={closePopup}>Close X</button>
      <img src={image} />
     </div>
    </div>
  );
};