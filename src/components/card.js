// создание самой карточки
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
  
  
  export {createCard, deleteCard, likeCard};