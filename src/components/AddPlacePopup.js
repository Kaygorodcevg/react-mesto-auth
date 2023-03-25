import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="popup_add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <div className="popup__input-wrapper">
        <input
          name="placeName"
          id="placeName-input"
          type="text"
          className="popup__input popup__input_place_name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangeName}
          value={name}
        />
        <span className="popup__input-error placeName-input-error"></span>
      </div>
      <div className="popup__input-wrapper">
        <input
          name="placeUrl"
          id="url-input"
          type="url"
          className="popup__input popup__input_place_url"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChangeLink}
          value={link}
        />
        <span className="popup__input-error url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
