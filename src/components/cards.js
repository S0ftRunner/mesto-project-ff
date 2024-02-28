import { openCardImage } from "./modals";

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// создание самой карточки
function createCard(element) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardTitle.textContent = element.name;
  cardLikeButton.addEventListener("click", () => likeCard(cardLikeButton));
  deleteButton.addEventListener("click", () => deleteCard(deleteButton));
  cardImage.addEventListener("click", () => openCardImage(cardImage));
  return cardElement;
}
// создание самой карточки

// удаление карточки
function deleteCard(deleteButton) {
  const listItem = deleteButton.closest(".card");
  listItem.remove();
}
// удаление карточки

// функция добавления лайка на картинку
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

export {createCard, initialCards};