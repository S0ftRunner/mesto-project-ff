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

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardTitle.textContent = cardData.name;
  cardLikeButton.addEventListener("click", () => likeCard(cardLikeButton));
  deleteButton.addEventListener("click", () => deleteCard(deleteButton));
  cardImage.addEventListener("click", () => openCardImage(cardImage));
  return cardElement;
}

/**
 * Функция удаления карточки
 * @param {button} deleteButton 
 */
function deleteCard(deleteButton) {
  const card = deleteButton.closest(".card");
  card.remove();
}

/**
 * Функция лайка карточки
 * @param {button} cardLikeButton 
 */
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
