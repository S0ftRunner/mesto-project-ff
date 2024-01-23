
const placesList = document.querySelector(".places__list");

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
  const listItem = deleteButton.closest('.card');
  listItem.remove();
}

function postCards() {
  initialCards.forEach((element) => {
    placesList.append(createCard(element));
  });
}

postCards();
