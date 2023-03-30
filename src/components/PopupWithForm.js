import React from 'react';

// function PopupWithForm({
//   onClose,
//   buttonText,
//   isOpen,
//   name,
//   title,
//   onSubmit,
//   img,
//   ...props
// }) {
//   return (
//     <div
//       className={
//         isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`
//       }
//     >
//       <div className="popup__container">
//         <button
//           type="button"
//           className="popup__close-icon"
//           onClick={onClose}
//         ></button>
//         <form
//           name={name}
//           className={`popup__form ${
//             name === 'infoTooltip' ? 'popup__info-tooltip' : ''
//           }`}
//           onSubmit={onSubmit}
//         >
//           {name === 'infoTooltip' && (
//             <img src={img} alt={name} className="popup__info-tooltip-img" />
//           )}
//           <h2
//             className={`popup__title ${
//               name === 'infoTooltip' ? 'popup__title_tooltip' : ''
//             }`}
//           >
//             {title}
//           </h2>
//           {props.children}
//           <button
//             className={`popup__submit-button ${
//               name === 'infoTooltip' ? 'popup__submit-button_hidden' : ''
//             }`}
//             type="submit"
//           >
//             {buttonText}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

function PopupWithForm({
  onClose,
  buttonText,
  isOpen,
  name,
  title,
  onSubmit,
  ...props
}) {
  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`
      }
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {props.children}
          <button className="popup__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
