const actions = {
  GET_TYPE_IDENTIFICATIONS_BEGIN: 'GET_TYPE_IDENTIFICATIONS_BEGIN',
  GET_TYPE_IDENTIFICATIONS_SUCCESS: 'GET_TYPE_IDENTIFICATIONS_SUCCESS',
  GET_TYPE_IDENTIFICATIONS_ERROR: 'GET_TYPE_IDENTIFICATIONS_ERROR',

  getTypeIdentificationsBegin: () => {
    return {
      type: actions.GET_TYPE_IDENTIFICATIONS_BEGIN,
    };
  },

  getTypeIdentificationsSuccess: (data) => {
    return {
      type: actions.GET_TYPE_IDENTIFICATIONS_SUCCESS,
      data,
    };
  },

  getTypeIdentificationsError: (err) => {
    return {
      type: actions.GET_TYPE_IDENTIFICATIONS_ERROR,
      err,
    };
  },
};

export default actions;
