const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  CLEAR_LOGIN_ERROR: 'CLEAR_LOGIN_ERROR',

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

  clearLoginForm: (err) => {
    return {
      type: actions.CLEAR_LOGIN_ERROR,
      err,
    };
  },
};

export default actions;
