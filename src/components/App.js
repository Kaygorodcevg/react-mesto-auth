// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Register from './Register';
import Login from './Login';
import * as auth from './auth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deleteCard, setDeleteCard] = React.useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([Api.getInitialCards(), Api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setConfirmPopupOpen(true);
    setDeleteCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userData) {
    Api.changeUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarData) {
    Api.changeAvatar(avatarData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    Api.getNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(password, email) {
    auth.register(password, email).then((res) => {
      setEmail(res.data.email);
      navigate('/sign-in', { replace: true });
    });
  }

  function handleAutorization(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setEmail(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        }
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegistration} />}
          ></Route>
          <Route
            path="/sign-in"
            element={<Login onAuth={handleAutorization} />}
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
                handleCardDelete={handleDeleteClick}
                cards={cards}
              />
            }
          />
          <Route element={<Footer />}></Route>
        </Routes>

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        ></EditProfilePopup>

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        ></AddPlacePopup>

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        ></EditAvatarPopup>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <ConfirmPopup
          card={deleteCard}
          onConfirm={handleCardDelete}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
        ></ConfirmPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
