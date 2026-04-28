const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',

  CLEAR_LOGIN_ERROR: 'CLEAR_LOGIN_ERROR',

  CHANGE_SCREEN: 'CHANGE_SCREEN',

  SEND_EMAIL_BEGIN: 'SEND_EMAIL_BEGIN',
  SEND_EMAIL_SUCCESS: 'SEND_EMAIL_SUCCESS',
  SEND_EMAIL_ERROR: 'SEND_EMAIL_ERROR',

  VALIDATE_CODE_BEGIN: 'VALIDATE_CODE_BEGIN',
  VALIDATE_CODE_SUCCESS: 'VALIDATE_CODE_SUCCESS',
  VALIDATE_CODE_ERROR: 'VALIDATE_CODE_ERROR',

  CHANGE_PASSWORD_BEGIN: 'CHANGE_PASSWORD_BEGIN',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_ERROR: 'CHANGE_PASSWORD_ERROR',

  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: (data) => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  loginError: (err) => {
    return {
      type: actions.LOGIN_ERROR,
      err,
    };
  },

  sendEmailBegin: () => {
    return {
      type: actions.SEND_EMAIL_BEGIN,
    };
  },

  sendEmailSuccess: (data) => {
    return {
      type: actions.SEND_EMAIL_SUCCESS,
      data,
    };
  },

  sendEmailError: (err) => {
    return {
      type: actions.SEND_EMAIL_ERROR,
      err,
    };
  },

  validateCodeBegin: () => {
    return {
      type: actions.VALIDATE_CODE_BEGIN,
    };
  },

  validateCodeSuccess: (data) => {
    return {
      type: actions.VALIDATE_CODE_SUCCESS,
      data,
    };
  },

  validateCodeError: (err) => {
    return {
      type: actions.VALIDATE_CODE_ERROR,
      err,
    };
  },

  changePasswordBegin: () => {
    return {
      type: actions.CHANGE_PASSWORD_BEGIN,
    };
  },

  changePasswordSuccess: (data) => {
    return {
      type: actions.CHANGE_PASSWORD_SUCCESS,
      data,
    };
  },

  changePasswordError: (err) => {
    return {
      type: actions.CHANGE_PASSWORD_ERROR,
      err,
    };
  },

  clearLoginForm: (err) => {
    return {
      type: actions.CLEAR_LOGIN_ERROR,
      err,
    };
  },

  changeScreen: (value) => {
    return {
      type: actions.CHANGE_SCREEN,
      value,
    };
  },
};

export default actions;
