const configValidation = {
  form: ".popup__form",
  input: ".popup__input",
  submitButton: ".popup__button",
  inputTypeError: "popup__input__error-border",
};

function enableValidation(configValidation) {
  const formList = Array.from(document.querySelectorAll(configValidation.form));
  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
}

function clearValidation(formElement, configValidation) {
  const inputElements = Array.from(
    formElement.querySelectorAll(configValidation.input)
  );
  const formButton = formElement.querySelector(configValidation.submitButton);
  formButton.disabled = true;
  inputElements.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configValidation.inputTypeError);
    errorElement.textContent = "";
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((innputElement) => {
    return !innputElement.validity.valid;
  });
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  configValidation
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputTypeError);
  console.log(inputElement);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, configValidation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidation.inputTypeError);
  errorElement.textContent = "";
}

function isValid(formElement, inputElement, configValidation) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, configValidation);
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternError);
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configValidation
    );
  } else {
    inputElement.setCustomValidity("");
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configValidation
    );
  }
}

function setEventListeners(formElement, configValidation) {
  const formButton = formElement.querySelector(configValidation.submitButton);
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.input)
  );
  toggleButtonState(inputList, formButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, configValidation);
      toggleButtonState(inputList, formButton);
    });
  });
}

export { enableValidation, clearValidation, configValidation };
