import "./pages/index.css";
import initialCards from "./cards";
const placesList = document.querySelector(".places__list");

const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const closePopupsButtons = document.querySelectorAll(".popup__close");

profileAddButton.addEventListener("click", () => openAddCardPopup());
profileEditButton.addEventListener("click", () => openEditProfilePopup());

closePopupsButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => closePopup(closeButton));
});

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
}

function openEditProfilePopup() {
  popupTypeEdit.classList.add("popup_is-opened");
}

function closePopup(closeButton) {
  const popup = closeButton.closest(".popup");
  popup.classList.remove("popup_is-opened");
}
