import { deleteCardFromHost, setLike, unLike } from "./api";
/**
 * Функция создания карточки
 * @param {card} cardData
 * @param {function} likeCard
 * @param {function} deleteCard
 * @param {function} openCardImage
 * @returns
 */
function createCard(cardData, likeCard, deleteCard, openCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  const cardId = cardData._id;

  cardLikeCounter.textContent = cardData.likes.length;
  cardData.likes.forEach((likeData) => {
    if (likeData._id === cardData.userId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardTitle.textContent = cardData.name;
  cardLikeButton.addEventListener("click", () =>
    likeCard(cardLikeButton, cardId, cardLikeCounter)
  );
  deleteButton.addEventListener("click", () =>
    deleteCard(deleteButton, cardId)
  );
  cardImage.addEventListener("click", () => openCardImage(cardImage));

  if (cardData.owner._id !== cardData.userId) {
    deleteButton.removeEventListener("click", () => deleteCard(deleteButton));
    deleteButton.remove();
  }

  return cardElement;
}

/**
 * Функция удаления карточки
 * @param {button} deleteButton
 */
function deleteCard(deleteButton, cardId) {
  const card = deleteButton.closest(".card");
  deleteCardFromHost(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(err));
}

/**
 * Функция лайка карточки
 * @param {button} cardLikeButton
 */
function likeCard(cardLikeButton, cardId, cardLikeCounter) {
  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    setLike(cardId)
      .then((cardData) => {
        cardLikeCounter.textContent = cardData.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    unLike(cardId)
      .then((cardData) => {
        cardLikeCounter.textContent = cardData.likes.length;
        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export { createCard, deleteCard, likeCard };
