const actions = {
  GET_RECOLLECTOR_BEGIN: 'GET_RECOLLECTOR_BEGIN',
  GET_RECOLLECTOR_SUCCESS: 'GET_RECOLLECTOR_SUCCESS',
  GET_RECOLLECTOR_ERROR: 'GET_RECOLLECTOR_ERROR',

  CREATE_RECOLLECTOR_BEGIN: 'CREATE_RECOLLECTOR_BEGIN',
  CREATE_RECOLLECTOR_SUCCESS: 'CREATE_RECOLLECTOR_SUCCESS',
  CREATE_RECOLLECTOR_ERROR: 'CREATE_RECOLLECTOR_ERROR',

  CLEAN_FORM: '',

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

  createRecollectorBegin: () => {
    return {
      type: actions.CREATE_RECOLLECTOR_BEGIN,
    };
  },

  createRecollectorSuccess: (data) => {
    return {
      type: actions.CREATE_RECOLLECTOR_SUCCESS,
      data,
    };
  },

  createRecollectorError: (err) => {
    return {
      type: actions.CREATE_RECOLLECTOR_ERROR,
      err,
    };
  },

  cleanForm: () => {
    return {
      type: actions.CLEAN_FORM,
    };
  },
};

export default actions;
