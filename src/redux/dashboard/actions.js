const actions = {
  GET_ALL_USERS_BEGIN: 'GET_ALL_USERS_BEGIN',
  GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_ERROR: 'GET_ALL_USERS_ERROR',

  getAllUsersBegin: () => {
    return {
      type: actions.GET_ALL_USERS_BEGIN,
    };
  },

  getAllUsersSuccess: (data) => {
    return {
      type: actions.GET_ALL_USERS_SUCCESS,
      data,
    };
  },

  getAllUsersError: (err) => {
    return {
      type: actions.GET_ALL_USERS_ERROR,
      err,
    };
  },
};

export default actions;
