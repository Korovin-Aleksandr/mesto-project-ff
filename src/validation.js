export const showInputError = (formElement, inputElement, errorMessage, errorSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorSettings.errorClass);
  };
  
export const hideInputError = (formElement, inputElement, errorSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove(errorSettings.inputErrorClass);
    errorElement.classList.remove(errorSettings.errorClass);
    errorElement.textContent = '';
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
    const toggleButtonState = () => {
      if (inputList.some((inputElement) => !inputElement.validity.valid)) {
        submitButton.classList.add(errorSettings.inactiveButtonClass);
        submitButton.disabled = true;
      } else {
        submitButton.classList.remove(errorSettings.inactiveButtonClass);
        submitButton.disabled = false;
      }
    }
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, errorSettings);
          toggleButtonState();
        });
      });
      toggleButtonState();
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