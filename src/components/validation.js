function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function clearValidation(formElement) {
  const inputElements = Array.from(
    formElement.querySelectorAll(".popup__input")
  );
  const formButton = formElement.querySelector(".popup__button");
  formButton.disabled = true;
  inputElements.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input__error-border");
    errorElement.textContent = "";
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button-disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button-disabled");
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((innputElement) => {
    return !innputElement.validity.valid;
  });
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input__error-border");
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input__error-border");
  errorElement.textContent = "";
}

function isValid(formElement, inputElement) {
  console.log(inputElement.validity.valid);
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternError);
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    inputElement.setCustomValidity("");
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}

function setEventListeners(formElement) {
  const formButton = formElement.querySelector(".popup__button");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  toggleButtonState(inputList, formButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, formButton);
      toggleButtonState(inputList, formButton);
    });
  });
}

export { enableValidation, clearValidation };

