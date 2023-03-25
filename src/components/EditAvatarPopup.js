import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="popup_avatar-edit"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <div className="popup__input-wrapper">
        <input
          name="avatar"
          id="avatarUrl-input"
          type="url"
          className="popup__input popup__input_avatar"
          placeholder="Загрузите новый аватар"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error avatarUrl-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
