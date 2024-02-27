// IMPORTS
import "./pages/index.css";
import initialCards from "./cards";
// IMPORTS

// ELEMENTS
const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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

//
function createCard(element) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardTitle.textContent = element.name;

  deleteButton.addEventListener("click", () => deleteCard(deleteButton));
  cardImage.addEventListener("click", (evt) => openCardImage(evt, cardImage));
  return cardElement;
}

function deleteCard(deleteButton) {
  const listItem = deleteButton.closest(".card");
  listItem.remove();
}

function postCards() {
  initialCards.forEach((element) => {
    placesList.append(createCard(element));
  });
}

postCards();

function openAddCardPopup() {
  popupNewCard.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function openEditProfilePopup() {
  popupTypeEdit.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  setFormProfileAtributes();
}

function setFormProfileAtributes() {
  const inputProfileTitle = popupTypeEdit.querySelector('.popup__input_type_name');
  const inputProfileDescription = popupTypeEdit.querySelector('.popup__input_type_description');
  inputProfileTitle.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function openCardImage(evt, image) {
  const popupImageContent = popupImage.querySelector(".popup__image");
  const popupImageCaption = popupImage.querySelector(".popup__caption");
  popupImageContent.src = image.src;
  popupImageContent.alt = image.alt;
  popupImageCaption.textContent = image.alt;
  popupImage.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(closeButton) {
  const popup = closeButton.closest(".popup");
  popup.classList.remove("popup_is-opened");
}

function closePopupByClickOverlay(evt) {
  if (!evt.target.classList.contains("popup__content")) {
    evt.target.classList.remove("popup_is-opened");
  }
}

// @TODO: реализовать функцию выхода по нажатию Esc
function closePopupByEsc(evt) {
  const activePopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    removePopup(activePopup);
  }
}

function removePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}
