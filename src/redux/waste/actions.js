const actions = {
  GET_WASTE_BEGIN: 'GET_WASTE_BEGIN',
  GET_WASTE_SUCCESS: 'GET_WASTE_SUCCESS',
  GET_WASTE_ERROR: 'GET_WASTE_ERROR',

  CREATE_WASTE_BEGIN: 'CREATE_WASTE_BEGIN',
  CREATE_WASTE_SUCCESS: 'CREATE_WASTE_SUCCESS',
  CREATE_WASTE_ERROR: 'CREATE_WASTE_ERROR',

  UPDATE_WASTE_BEGIN: 'UPDATE_WASTE_BEGIN',
  UPDATE_WASTE_SUCCESS: 'UPDATE_WASTE_SUCCESS',
  UPDATE_WASTE_ERROR: 'UPDATE_WASTE_ERROR',

  TOGGLE_STATUS_WASTE_BEGIN: 'TOGGLE_STATUS_WASTE_BEGIN',
  TOGGLE_STATUS_WASTE_SUCCESS: 'TOGGLE_STATUS_WASTE_SUCCESS',
  TOGGLE_STATUS_WASTE_ERROR: 'TOGGLE_STATUS_WASTE_ERROR',

  DELETE_WASTE_BEGIN: 'DELETE_WASTE_BEGIN',
  DELETE_WASTE_SUCCESS: 'DELETE_WASTE_SUCCESS',
  DELETE_WASTE_ERROR: 'DELETE_WASTE_ERROR',

  SET_SELECTED_WASTE: 'SET_SELECTED_WASTE',
  CLEAN_WASTE_FORM: 'CLEAN_WASTE_FORM',

  // --- GET ---
  getWasteBegin: () => ({ type: actions.GET_WASTE_BEGIN }),
  getWasteSuccess: (data) => ({ type: actions.GET_WASTE_SUCCESS, data }),
  getWasteError: (err) => ({ type: actions.GET_WASTE_ERROR, err }),

  // --- CREATE ---
  createWasteBegin: () => ({ type: actions.CREATE_WASTE_BEGIN }),
  createWasteSuccess: (data) => ({ type: actions.CREATE_WASTE_SUCCESS, data }),
  createWasteError: (err) => ({ type: actions.CREATE_WASTE_ERROR, err }),

  // --- UPDATE ---
  updateWasteBegin: () => ({ type: actions.UPDATE_WASTE_BEGIN }),
  updateWasteSuccess: (data) => ({ type: actions.UPDATE_WASTE_SUCCESS, data }),
  updateWasteError: (err) => ({ type: actions.UPDATE_WASTE_ERROR, err }),

  // --- TOGGLE STATUS ---
  toggleStatusWasteBegin: () => ({ type: actions.TOGGLE_STATUS_WASTE_BEGIN }),
  toggleStatusWasteSuccess: (data) => ({ type: actions.TOGGLE_STATUS_WASTE_SUCCESS, data }),
  toggleStatusWasteError: (err) => ({ type: actions.TOGGLE_STATUS_WASTE_ERROR, err }),

  // --- DELETE ---
  deleteWasteBegin: () => ({ type: actions.DELETE_WASTE_BEGIN }),
  deleteWasteSuccess: (id) => ({ type: actions.DELETE_WASTE_SUCCESS, id }),
  deleteWasteError: (err) => ({ type: actions.DELETE_WASTE_ERROR, err }),

  // --- MISC ---
  setSelectedWaste: (waste) => ({ type: actions.SET_SELECTED_WASTE, waste }),
  cleanWasteForm: () => ({ type: actions.CLEAN_WASTE_FORM }),
};

export default actions;
