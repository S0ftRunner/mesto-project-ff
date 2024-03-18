// IMPORTS
import "../pages/index.css";
import {
  openPopup,
  closePopupByClickOverlay,
  closePopupByButtonClick,
  closePopup,
} from "./modals";
import { likeCard, deleteCard, createCard } from "./card";
import { clearValidation, enableValidation } from "./validation";
import { getCards, postCard, updateProfile, getProfileSettings } from "./api";
// IMPORTS

// ELEMENTS
const cardImageForm = document.querySelector(".popup__form-new-card");
const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileForm = document.querySelector(".popup__form-profile");
const addCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const inputNewCardTitle = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const inputNewCardLink = popupNewCard.querySelector(".popup__input_type_url");

const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputProfileTitle = popupTypeEdit.querySelector(
  ".popup__input_type_name"
);
const inputProfileDescription = popupTypeEdit.querySelector(
  ".popup__input_type_description"
);

const closePopupsButtons = document.querySelectorAll(".popup__close");
// ELEMENTS

// EVENTS
addCardButton.addEventListener("click", openAddCardPopup);
profileEditButton.addEventListener("click", openEditProfilePopup);
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => closePopupByClickOverlay(evt));
});

closePopupsButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () =>
    closePopupByButtonClick(closeButton)
  );
});

cardImageForm.addEventListener("submit", handleCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

// EVENTS

/**
 * Рендеринг начальных карт
 */
function renderInitialCards() {
  getCards().then((cards) => {
    Array.from(cards).forEach((card) => {
      const cardData = {
        name: card.name,
        link: card.link,
        cardId: card._id,
      };
      cardsContainer.append(
        createCard(cardData, likeCard, deleteCard, openCardImage)
      );
    });
  });
}

/**
 * Модальное окно редактирования профиля
 */
function openEditProfilePopup() {
  openPopup(popupTypeEdit);
  setFormProfileAttributes();
  clearValidation(profileForm);

}

/**
 * Для открытия модального окна добавления карточки
 */
function openAddCardPopup() {
  cardImageForm.reset();
  openPopup(popupNewCard);
  clearValidation(cardImageForm);
}

/**
 * Установка атрибутов для полей ввода редактирования профиля
 */
function setFormProfileAttributes() {
  getProfileSettings().then((res) => {
    inputProfileTitle.value = res.name;
    inputProfileDescription.value = res.about;
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
  });

}

/**
 * Для открытия модального окна изображения карточки
 * @param {image} image
 */
function openCardImage(image) {
  openPopup(popupImage);
  popupImageContent.src = image.src;
  popupImageContent.alt = image.alt;
  popupImageCaption.textContent = image.alt;
}

/**
 * Обработчик на добавление карточки
 * @param {Event} evt
 */
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNewCardTitle.value,
    link: inputNewCardLink.value,
  };

  postCard(newCard)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      cardsContainer.prepend(
        createCard(newCard, likeCard, deleteCard, openCardImage)
      );
    });
  closePopup(popupNewCard);
  cardImageForm.reset();
}

/**
 * Обработчик для изменения полей формы редактирования профиля
 * @param {Event} evt
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileData = {
    name: inputProfileTitle.value,
    description: inputProfileDescription.value,
  };
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.description;
  updateProfile(profileData);

  closePopup(popupTypeEdit);
}

setFormProfileAttributes();
enableValidation();
renderInitialCards();
