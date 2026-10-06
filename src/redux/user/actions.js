const actions = {
  GET_USERS_BEGIN: 'GET_USERS_BEGIN',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_ERROR: 'GET_USERS_ERROR',

  CHANGE_STATE_BEGIN: 'CHANGE_STATE_BEGIN',
  CHANGE_STATE_SUCCESS: 'CHANGE_STATE_SUCCESS',
  CHANGE_STATE_ERROR: 'CHANGE_STATE_ERROR',

  SEARCH_USER_BEGIN: 'SEARCH_USER_BEGIN',
  SEARCH_USER_SUCCESS: 'SEARCH_USER_SUCCESS',
  SEARCH_USER_ERROR: 'SEARCH_USER_ERROR',

  CLEAN_FORM: 'CLEAN_FORM',

  DELETE_USER_BEGIN: 'DELETE_USER_BEGIN',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_ERROR: 'DELETE_USER_ERROR',

  getUsersBegin: () => {
    return {
      type: actions.GET_USERS_BEGIN,
    };
  },

  getUsersSuccess: (data) => {
    return {
      type: actions.GET_USERS_SUCCESS,
      data,
    };
  },

  getUsersError: (err) => {
    return {
      type: actions.GET_USERS_ERROR,
      err,
    };
  },

  changeStateBegin: () => {
    return {
      type: actions.CHANGE_STATE_BEGIN,
    };
  },

  changeStateSuccess: (data) => {
    return {
      type: actions.CHANGE_STATE_SUCCESS,
      data,
    };
  },

  changeStateError: (err) => {
    return {
      type: actions.CHANGE_STATE_ERROR,
      err,
    };
  },

  searchUserBegin: () => {
    return {
      type: actions.SEARCH_USER_BEGIN,
    };
  },

  searchUserSuccess: (data) => {
    return {
      type: actions.SEARCH_USER_SUCCESS,
      data,
    };
  },

  searchUserError: (err) => {
    return {
      type: actions.SEARCH_USER_ERROR,
      err,
    };
  },

  cleanForm: () => {
    return {
      type: actions.CLEAN_FORM,
    };
  },

  deleteUserBegin: () => {
    return {
      type: actions.DELETE_USER_BEGIN,
    };
  },

  deleteUserSuccess: (data) => {
    return {
      type: actions.DELETE_USER_SUCCESS,
      data,
    };
  },

  deleteUserError: (err) => {
    return {
      type: actions.DELETE_USER_ERROR,
      err,
    };
  },
}

export default actions;
