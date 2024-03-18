function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function clearValidation(formElement) {
  const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
  const formButton = formElement.querySelector('.popup__button');
  formButton.disabled = true;
  inputElements.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input__error-border');
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

function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input__error-border");
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);  
  errorElement.textContent = inputElement.dataset.errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input__error-border");
  inputElement.setCustomValidity("");
  errorElement.textContent = "";
}

function isValid(formElement, inputElement) {
  console.log(inputElement.value);
  if (inputElement.value && !inputElement.validity.tooShort && !inputElement.validity.tooLong) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
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


export { enableValidation, clearValidation};

/**
 * Задать через pattern mismatch регулярки, и для разных ситуаций вызывать разные сообщения через
 * data-атрибуты
 */