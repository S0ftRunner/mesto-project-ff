/**
 * Мои данные:
 * Токен: 034c2434-530d-4982-835c-e099b7f755c8
 * Идентификатор группы: wff-cohort-8
 */

async function getCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
    headers: {
      authorization: "034c2434-530d-4982-835c-e099b7f755c8",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((res) => {
      console.log(`что-то пошло не так. Код ошибки: ${res}`);
    });
}

export { getCards };
