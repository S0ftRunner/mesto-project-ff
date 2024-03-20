/**
 * Функция открытия попапа
 * @param {popup} popup
 */
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

/**
 * Закрытие попапа через кнопку
 * @param {button} closeButton
 */
function closePopupByButtonClick(closeButton) {
  const popup = closeButton.closest(".popup");
  closePopup(popup);
}

/**
 * Закрытие попапа через клик по оверлею
 * @param {Event} evt
 */
function closePopupByClickOverlay(evt) {
  if (!evt.target.classList.contains("popup__content")) {
    closePopup(evt.target);
  }
}

/**
 * Закрытие попапа через Escape
 * @param {Event} evt
 */
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  }
}

/**
 * Функция закрытия попапа
 * @param {popup} popup
 */
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

export {
  closePopupByClickOverlay,
  closePopupByButtonClick,
  openPopup,
  closePopup,
};
