const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8/",
  headers: {
    authorization: "034c2434-530d-4982-835c-e099b7f755c8",
    "Content-Type": "application/json",
  },
};

function getCards() {
  return fetch(`${config.baseUrl}cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkStatus(res);
  });
}

function postCard(cardData) {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify(cardData),
  }).then((res) => {
    return checkStatus(res);
  });
}

function deleteCardFromHost(cardId) {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkStatus(res);
  });
}

function updateProfile(profileData) {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: profileData.name,
      about: profileData.description,
    }),
  }).then((res) => {
    return checkStatus(res);
  });
}

function getProfileSettings() {
  return fetch(`${config.baseUrl}users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkStatus(res);
  });
}

function setLike(cardId) {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkStatus(res);
  });
}

function unLike(cardId) {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkStatus(res);
  });
}

function setProfileAvatar(avatarLink) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => {
    return checkStatus(res);
  });
}

function checkStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export {
  getCards,
  postCard,
  deleteCardFromHost,
  updateProfile,
  getProfileSettings,
  setLike,
  unLike,
  setProfileAvatar,
};
