import React from "react";
import "../css/popup.css"
import image from "../img/no.png"
export const ErrorPopup = ({ closeErrorPopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <button onClick={closeErrorPopup}>Close</button>
      <img src={image} />
     </div>
    </div>
  );
};