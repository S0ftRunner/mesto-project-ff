import {inputNewCardTitle, inputNewCardLink, popupImage, popupNewCard, popupTypeEdit, profileTitle, profileDescription, inputProfileTitle, inputProfileDescription, cardsContainer} from './index';
import { createCard } from './cards';
// модальное окно добавление карточки
function openAddCardPopup() {
    popupNewCard.classList.add("popup_is-opened");
    const cardImageForm = popupNewCard.querySelector(".popup__form");
    cardImageForm.addEventListener("submit", createUserCard);
    document.addEventListener("keydown", closePopupByEsc);
  }
  // модальное окно добавление карточки
  
  // модальное окно редактирования профиля
  function openEditProfilePopup() {
    popupTypeEdit.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupByEsc);
    setFormProfileAttributes();
    const profileForm = popupTypeEdit.querySelector(".popup__form");
    profileForm.addEventListener("submit", setNewProfileAttributes);
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
    const popupImageContent = popupImage.querySelector(".popup__image");
    const popupImageCaption = popupImage.querySelector(".popup__caption");
    popupImageContent.src = image.src;
    popupImageContent.alt = image.alt;
    popupImageCaption.textContent = image.alt;
    popupImage.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupByEsc);
  }
  // открытие модального окна карточки
  
  // закрытие попапа через кнопку
  function closePopup(closeButton) {
    const popup = closeButton.closest(".popup");
    popup.classList.remove("popup_is-opened");
  }
  // закрытие попапа через кнопку
  
  // закрытие попапа через клик на оверлей
  function closePopupByClickOverlay(evt) {
    if (!evt.target.classList.contains("popup__content")) {
      evt.target.classList.remove("popup_is-opened");
    }
  }
  // закрытие попапа через клик на оверлей
  
  // закрытие попапа через esc
  function closePopupByEsc(evt) {
    const activePopup = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape") {
      removePopup(activePopup);
    }
  }
  // закрытие попапа через esc
  
  // удаление попапа
  function removePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupByEsc);
  }
  //удаление попапа
  
  function setNewProfileAttributes(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputProfileTitle.value;
    profileDescription.textContent = inputProfileDescription.value;
    const popup = inputProfileTitle.closest(".popup");
    removePopup(popup);
  }
  
  function createUserCard(evt) {
    const popup = inputNewCardLink.closest('.popup');
    evt.preventDefault();
    const newCard = {
      name: inputNewCardTitle.value,
      link: inputNewCardLink.value,
    };
  
    cardsContainer.prepend(createCard(newCard));
    removePopup(popup);
  }

  export {openAddCardPopup, openEditProfilePopup, openCardImage, closePopupByClickOverlay, closePopup}