import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup_profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <div className="popup__input-wrapper">
        <input
          id="name-input"
          name="name"
          type="text"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__input-wrapper">
        <input
          id="job-input"
          name="about"
          type="text"
          className="popup__input popup__input_type_job"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error job-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
