import {
  inputNewCardTitle,
  inputNewCardLink,
  popupNewCard,
  popupImage,
  popupImageContent,
  popupImageCaption,
  popupTypeEdit,
  profileTitle,
  profileDescription,
  inputProfileTitle,
  inputProfileDescription,
  cardsContainer,
} from "./index";
import { likeCard, deleteCard, createCard } from "./card";

// нужно создать openCardPopup(), который должен будет принимать
// Мои мысли: сделать openPopup(), который в качестве параметра будет принимать класс, к которому надо будет добавить .popup_is-opened

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  if (popup.classList.contains("popup_type_new-card")) {
    addCardPopup();
  } else if (popup.classList.contains("popup_type_edit")) {
    openEditProfilePopup();
  }
}

// модальное окно добавление карточки
function addCardPopup() {
  document.addEventListener("keydown", closePopupByEsc);
}
// модальное окно добавление карточки

// модальное окно редактирования профиля
function openEditProfilePopup() {
  document.addEventListener("keydown", closePopupByEsc);
  setFormProfileAttributes();
  const profileForm = popupTypeEdit.querySelector(".popup__form");
  profileForm.addEventListener("submit", handleProfileFormSubmit);
}
// модальное окно редактирования профиля

// установка атрибутов для полей ввода профиля
function setFormProfileAttributes() {
  inputProfileTitle.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}
// установка атрибутов для полей ввода профиля

// открытие модального окна карточки
function openCardImage(image) {
  popupImageContent.src = image.src;
  popupImageContent.alt = image.alt;
  popupImageCaption.textContent = image.alt;
  popupImage.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}
// открытие модального окна карточки

// закрытие попапа через кнопку
function closePopupByButtonClick(closeButton) {
  const popup = closeButton.closest(".popup");
  closePopup(popup);
}
// закрытие попапа через кнопку

// закрытие попапа через клик на оверлей
function closePopupByClickOverlay(evt) {
  if (!evt.target.classList.contains("popup__content")) {
    closePopup(evt.target);
  }
}
// закрытие попапа через клик на оверлей

// закрытие попапа через esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  }
}
// закрытие попапа через esc

// удаление попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}
//удаление попапа

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputProfileTitle.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(popupTypeEdit);
}

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

export {
  openEditProfilePopup,
  openCardImage,
  closePopupByClickOverlay,
  closePopupByButtonClick,
  openPopup,
  handleCardFormSubmit,
};
