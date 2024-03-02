// IMPORTS
import "../pages/index.css";
import {
  openPopup,
  closePopupByClickOverlay,
  closePopupByButtonClick,
  closePopup,
} from "./modals";
import initialCards from "./cards";
import { likeCard, deleteCard, createCard } from "./card";

// IMPORTS

// ELEMENTS

const cardImageForm = document.querySelector(".popup__form-new-card");
const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileForm = document.querySelector(".popup__form-profile");
const profileAddButton = document.querySelector(".profile__add-button");
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
profileAddButton.addEventListener("click", openAddCard);
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

// вывод начальных карточек на экран
function renderInitialCards() {
  initialCards.forEach((card) => {
    cardsContainer.append(
      createCard(card, likeCard, deleteCard, openCardImage)
    );
  });
}
// вывод начальных карточек на экран

// модальное окно редактирования профиля
function openEditProfilePopup() {
  openPopup(popupTypeEdit);
  setFormProfileAttributes();
}
// модальное окно редактирования профиля

function openAddCard() {
  openPopup(popupNewCard);
}

// установка атрибутов для полей ввода профиля
function setFormProfileAttributes() {
  inputProfileTitle.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}
// установка атрибутов для полей ввода профиля

// открытие модального окна карточки
function openCardImage(image) {
  openPopup(popupImage);
  popupImageContent.src = image.src;
  popupImageContent.alt = image.alt;
  popupImageCaption.textContent = image.alt;
}
// открытие модального окна карточки

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNewCardTitle.value,
    link: inputNewCardLink.value,
  };

  cardsContainer.prepend(
    createCard(newCard, likeCard, deleteCard, openCardImage)
  );
  closePopup(popupNewCard);
  inputNewCardLink.value = "";
  inputNewCardTitle.value = "";
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputProfileTitle.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(popupTypeEdit);
}

renderInitialCards();

export {
  inputNewCardTitle,
  inputNewCardLink,
  popupNewCard,
  popupTypeEdit,
  popupImage,
  popupImageContent,
  popupImageCaption,
  profileTitle,
  profileDescription,
  inputProfileTitle,
  inputProfileDescription,
  cardsContainer,
  deleteCard,
  likeCard,
};
