export const toggleButtonState = (inputList, submitButton, errorSettings) => {
  if (inputList.some((inputElement) => !inputElement.validity.valid)) {
    submitButton.classList.add(errorSettings.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(errorSettings.inactiveButtonClass);
    submitButton.disabled = false;
  }
};

export const showInputError = (formElement, inputElement, errorMessage, errorSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(errorSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorSettings.errorClass);
  };
  
export const hideInputError = (formElement, inputElement, errorSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(errorSettings.inputErrorClass);
    errorElement.classList.remove(errorSettings.inputErrorClass);
    errorElement.classList.remove(errorSettings.errorClass);
    errorElement.textContent = '';
    inputElement.setCustomValidity("");
  };
  
  
export const checkInputValidity = (formElement, inputElement, errorSettings) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, errorSettings);
    } else {
      hideInputError(formElement, inputElement, errorSettings);
    }
  };
  
export const setEventListeners = (formElement, errorSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(errorSettings.inputSelector));
    const submitButton = formElement.querySelector(errorSettings.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, errorSettings);
        toggleButtonState(inputList, submitButton, errorSettings);
      });
    });
    toggleButtonState(inputList, submitButton, errorSettings);
  };

export const enableValidation = (errorSettings) => {
    const formList = Array.from(document.querySelectorAll(errorSettings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, errorSettings);
    });
  };

// Функция очистки ошибок валидации и деактивации кнопки
export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });
  submitButton.classList.add(settings.inactiveButtonClass);
  submitButton.disabled = true;
};