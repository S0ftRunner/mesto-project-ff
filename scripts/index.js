// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

function createCard(deleteCard) {
  let cardList = [];
  initialCards.forEach((element) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);

    const deleteButton = cardElement.querySelector(".card__delete-button");

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = element.link;
    cardImage.alt = element.name;

    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = element.name;

    deleteButton.addEventListener("click", deleteCard(deleteButton));
    cardList.push(cardElement);
  });
  return cardList;
}

// Мне кажется, что криво сделано, нет?
function deleteCard(deleteButton) {
  deleteButton.addEventListener("click", () => {
    const listItem = deleteButton.closest(".card");
    listItem.remove();
  });
}

function postCards() {
  const cardList = createCard(deleteCard);
  cardList.forEach((element) => {
    placesList.append(element);
  });
}

postCards();