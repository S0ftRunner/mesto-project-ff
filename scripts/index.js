// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

function createCard(deleteCard) {
  initialCards.forEach((element) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);

    const deleteButton = cardElement.querySelector(".card__delete-button");

    let cardImage = cardElement.querySelector(".card__image");
    cardImage.src = element.link;
    cardImage.alt = element.name;

    let cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = element.name;

    placesList.append(cardElement);
    deleteButton.addEventListener("click", deleteCard);
  });
}

function deleteCard() {
  const deleteButton = document.querySelector(".card__delete-button");
  const listItem = deleteButton.closest(".card");
  listItem.remove();
}

createCard(deleteCard);
