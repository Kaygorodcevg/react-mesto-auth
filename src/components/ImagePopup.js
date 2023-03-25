import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div
      className={ `popup popup_zoom-image ${(JSON.stringify(card) !== '{}') && "popup_opened"}`}>
      <div className="popup__zoom-wrapper">
        <button
          type="button"
          className="popup__close-icon popup__close-icon_zoom-image"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            src={card?.link}
            className="popup__picture"
          ></img>
          <figcaption className="popup__figcaption">
            {card?.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
