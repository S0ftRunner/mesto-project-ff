// IMPORTS
import "../pages/index.css";
import {
  openAddCardPopup,
  openEditProfilePopup,
  closePopupByClickOverlay,
  closePopup,
} from "./modals";
import { createCard, initialCards } from "./cards";
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


// вывод начальных карточек на экран
function postCards() {
  initialCards.forEach((element) => {
    cardsContainer.append(createCard(element));
  });
}
// вывод начальных карточек на экран

postCards();

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
  cardsContainer
};
