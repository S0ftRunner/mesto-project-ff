
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
import {
  getCards,
  postCard,
  updateProfile,
  getProfileSettings,
  setProfileAvatar,
} from "./api";
// IMPORTS

// ELEMENTS
const configValidation = {
  form: ".popup__form",
  input: ".popup__input",
  submitButton: ".popup__button",
  inputTypeError: "popup__input__error-border",
};
let userId;
const cardImageForm = document.querySelector(".popup__form-new-card");
const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileForm = document.querySelector(".popup__form-profile");
const addCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const inputNewCardTitle = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const inputNewCardLink = popupNewCard.querySelector(".popup__input-new-card");

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

const profileAvatar = document.querySelector(".profile__image");
const profileAvatarEditButton = document.querySelector(
  ".profile__image-container"
);
const profileAvatarPopup = document.querySelector(".popup_type_new-avatar");
const profileAvatarForm = document.querySelector(".popup__form-avatar");
const inputAvatarLink = document.querySelector(".popup__input-avatar-link");
// ELEMENTS

// EVENTS
addCardButton.addEventListener("click", openAddCardPopup);
profileEditButton.addEventListener("click", openEditProfilePopup);
profileAvatarEditButton.addEventListener("click", openEditAvatarPopup);
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
profileAvatarForm.addEventListener("submit", handleAvatarFormSubmit);
// EVENTS

/**
 * Рендеринг начальных карт
 */
function renderInitialCards() {
  Promise.all([getCards(), getProfileSettings()])
    .then(([cards, user]) => {
      Array.from(cards).forEach((cardData) => {
        userId = user._id;
        profileAvatar.src = user.avatar;
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        cardData.userId = user._id;
        cardsContainer.append(
          createCard(cardData, likeCard, deleteCard, openCardImage)
        );
      });
    })
    .catch((err) => console.log(err));
}

/**
 * Модальное окно редактирования профиля
 */
function openEditProfilePopup() {
  openPopup(popupTypeEdit);
  setFormProfileAttributes();
  clearValidation(profileForm, configValidation);
}

/**
 * Для открытия модального окна добавления карточки
 */
function openAddCardPopup() {
  cardImageForm.reset();
  openPopup(popupNewCard);
  clearValidation(cardImageForm, configValidation);
}

function openEditAvatarPopup() {
  profileAvatarForm.reset();
  openPopup(profileAvatarPopup);
  clearValidation(profileAvatarForm, configValidation);
}

/**
 * Установка атрибутов для полей ввода редактирования профиля
 */
function setFormProfileAttributes() {
  inputProfileTitle.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
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
  const buttonSubmit = evt.target.querySelector(".button");
  renderLoading(true, buttonSubmit);

  evt.preventDefault();
  const newCard = {
    name: inputNewCardTitle.value,
    link: inputNewCardLink.value,
  };

  postCard(newCard)
    .then((cardData) => {
      console.log(cardData);
      cardData.userId = userId;
      cardsContainer.prepend(
        createCard(cardData, likeCard, deleteCard, openCardImage)
      );
    })
    .then(() => {
      closePopup(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, buttonSubmit));
}

/**
 * Обработчик для изменения полей формы редактирования профиля
 * @param {Event} evt
 */
function handleProfileFormSubmit(evt) {
  const buttonSubmit = evt.target.querySelector(".button");
  renderLoading(true, buttonSubmit);
  evt.preventDefault();
  const profileData = {
    name: inputProfileTitle.value,
    description: inputProfileDescription.value,
  };
  updateProfile(profileData)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .then(() => {
      closePopup(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, buttonSubmit));
}

function handleAvatarFormSubmit(evt) {
  const buttonSubmit = evt.target.querySelector(".button");
  renderLoading(true, buttonSubmit);
  evt.preventDefault();
  const avatarLink = inputAvatarLink.value;
  setProfileAvatar(avatarLink)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .then(() => {
      closePopup(profileAvatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, buttonSubmit));
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

enableValidation(configValidation);
renderInitialCards();
