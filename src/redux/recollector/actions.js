const actions = {
  GET_RECOLLECTOR_BEGIN: 'GET_RECOLLECTOR_BEGIN',
  GET_RECOLLECTOR_SUCCESS: 'GET_RECOLLECTOR_SUCCESS',
  GET_RECOLLECTOR_ERROR: 'GET_RECOLLECTOR_ERROR',

  CREATE_RECOLLECTOR_BEGIN: 'CREATE_RECOLLECTOR_BEGIN',
  CREATE_RECOLLECTOR_SUCCESS: 'CREATE_RECOLLECTOR_SUCCESS',
  CREATE_RECOLLECTOR_ERROR: 'CREATE_RECOLLECTOR_ERROR',

  UPLOAD_DOCUMENT_BEGIN: 'UPLOAD_DOCUMENT_BEGIN',
  UPLOAD_DOCUMENT_SUCCESS: 'UPLOAD_DOCUMENT_SUCCESS',
  UPLOAD_DOCUMENT_ERROR: 'UPLOAD_DOCUMENT_ERROR',

  GET_STATES_BEGIN: 'GET_STATES_BEGIN',
  GET_STATES_SUCCESS: 'GET_STATES_SUCCESS',
  GET_STATES_ERROR: 'GET_STATES_ERROR',

  CHANGE_STATE_LIST_BEGIN: 'CHANGE_STATE_LIST_BEGIN',
  CHANGE_STATE_LIST_SUCCESS: 'CHANGE_STATE_LIST_SUCCESS',
  CHANGE_STATE_LIST_ERROR: 'CHANGE_STATE_LIST_ERROR',

  CHANGE_STATE_BEGIN: 'CHANGE_STATE_BEGIN',
  CHANGE_STATE_SUCCESS: 'CHANGE_STATE_SUCCESS',
  CHANGE_STATE_ERROR: 'CHANGE_STATE_ERROR',

  CLEAN_FORM: 'CLEAN_FORM',

  UPDATE_RECOLLECTOR_BEGIN: 'UPDATE_RECOLLECTOR_BEGIN',
  UPDATE_RECOLLECTOR_SUCCESS: 'UPDATE_RECOLLECTOR_SUCCESS',
  UPDATE_RECOLLECTOR_ERROR: 'UPDATE_RECOLLECTOR_ERROR',

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

  uploadDocumentBegin: () => {
    return {
      type: actions.UPLOAD_DOCUMENT_BEGIN,
    };
  },

  uploadDocumentSuccess: (data) => {
    return {
      type: actions.UPLOAD_DOCUMENT_SUCCESS,
      data,
    };
  },

  uploadDocumentError: (err) => {
    return {
      type: actions.UPLOAD_DOCUMENT_ERROR,
      err,
    };
  },

  getStatesBegin: () => {
    return {
      type: actions.GET_STATES_BEGIN,
    };
  },

  getStatesSuccess: (data) => {
    return {
      type: actions.GET_STATES_SUCCESS,
      data,
    };
  },

  getStatesError: (err) => {
    return {
      type: actions.GET_STATES_ERROR,
      err,
    };
  },

  changeStateListBegin: () => {
    return {
      type: actions.CHANGE_STATE_LIST_BEGIN,
    };
  },

  changeStateListSuccess: (data) => {
    return {
      type: actions.CHANGE_STATE_LIST_SUCCESS,
      data,
    };
  },

  changeStateListError: (err) => {
    return {
      type: actions.CHANGE_STATE_LIST_ERROR,
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

  updateRecollectorBegin: () => {
    return {
      type: actions.UPDATE_RECOLLECTOR_BEGIN,
    };
  },

  updateRecollectorSuccess: (data) => {
    return {
      type: actions.UPDATE_RECOLLECTOR_SUCCESS,
      data,
    };
  },

  updateRecollectorError: (err) => {
    return {
      type: actions.UPDATE_RECOLLECTOR_ERROR,
      err,
    };
  },
};

export default actions;
