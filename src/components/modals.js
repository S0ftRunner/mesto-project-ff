function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// закрытие попапа через кнопку
function closePopupByButtonClick(closeButton) {
  const popup = closeButton.closest(".popup");
  closePopup(popup);
}
// закрытие попапа через кнопку

// закрытие попапа через клик на оверлей
function closePopupByClickOverlay(evt) {
  if (!evt.target.classList.contains("popup__content")) {
    closePopup(evt.target);
  }
}
// закрытие попапа через клик на оверлей

// закрытие попапа через esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  }
}
// закрытие попапа через esc

// удаление попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}
//удаление попапа

export {
  closePopupByClickOverlay,
  closePopupByButtonClick,
  openPopup,
  closePopup,
};
