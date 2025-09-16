const actions = {
  GET_RECOLLECTOR_BEGIN: 'GET_RECOLLECTOR_BEGIN',
  GET_RECOLLECTOR_SUCCESS: 'GET_RECOLLECTOR_SUCCESS',
  GET_RECOLLECTOR_ERROR: 'GET_RECOLLECTOR_ERROR',

  getRecollectorBegin: () => {
    return {
      type: actions.GET_RECOLLECTOR_BEGIN,
    };
  },

  getRecollectorSuccess: (data) => {
    return {
      type: actions.GET_RECOLLECTOR_SUCCESS,
      data,
    };
  },

  getRecollectorError: (err) => {
    return {
      type: actions.GET_RECOLLECTOR_ERROR,
      err,
    };
  },
};

export default actions;
