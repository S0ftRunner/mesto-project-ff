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

 async function postCard(cardData) {
 return fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "034c2434-530d-4982-835c-e099b7f755c8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  })
    .then((res) => {
      if (res.ok) {
        console.log("success");
        return res.json();
      } else {
        console.log(`Что-то пошло не так. Код ошибки: ${res.status}`);
      }
    })
    .then((result) => {
      return result;
    });
}

async function deleteCardFromHost(cardId) {
  console.log(cardId);
  fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "034c2434-530d-4982-835c-e099b7f755c8",
    },
  }).then((res) => {
    if (res.ok) {
      console.log('карточка успушно удалена');
      return res;
    } else {
      console.log(`Что-то пошло не так. Код ошибки: ${res.status}`);
    }
  });
}

async function updateProfile(profileData) {
  fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "034c2434-530d-4982-835c-e099b7f755c8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileData.name,
      about: profileData.description,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log("обновил данные пользователя");
    } else {
      console.log(res.status);
    }
  });
}

async function getProfileSettings() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
    headers: {
      authorization: "034c2434-530d-4982-835c-e099b7f755c8",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    });
}

export {
  getCards,
  postCard,
  deleteCardFromHost,
  updateProfile,
  getProfileSettings,
};
