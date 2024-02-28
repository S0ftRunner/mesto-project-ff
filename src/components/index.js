// IMPORTS
import "../pages/index.css";
import {
  openAddCardPopup,
  openEditProfilePopup,
  closePopupByClickOverlay,
  closePopup,
} from "./modals";
import initialCards  from "./cards";
import createCard from "./card";
import { openCardImage } from "./modals";

// IMPORTS

// ELEMENTS
const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const inputNewCardTitle = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const inputNewCardLink = popupNewCard.querySelector(".popup__input_type_url");

const popupImage = document.querySelector(".popup_type_image");

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
profileAddButton.addEventListener("click", () => openAddCardPopup());
profileEditButton.addEventListener("click", () => openEditProfilePopup());
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => closePopupByClickOverlay(evt));
});

closePopupsButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => closePopup(closeButton));
});
// EVENTS

  // удаление карточки
  function deleteCard(deleteButton) {
    const card = deleteButton.closest(".card");
    card.remove();
  }
  // удаление карточки
  
  // функция добавления лайка на картинку
  function likeCard(cardLikeButton) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }
  // функция добавления лайка на картинку
// вывод начальных карточек на экран
function renderInitialCards() {
  initialCards.forEach((card) => {
    cardsContainer.append(createCard(card, likeCard, deleteCard, openCardImage));
  });
}
// вывод начальных карточек на экран

renderInitialCards();

export {
  inputNewCardTitle,
  inputNewCardLink,
  popupNewCard,
  popupTypeEdit,
  popupImage,
  profileTitle,
  profileDescription,
  inputProfileTitle,
  inputProfileDescription,
  cardsContainer,
  deleteCard, 
  likeCard
};
