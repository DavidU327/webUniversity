const actions = {
  getLevelBegin: () => ({ type: 'GET_LEVEL_BEGIN' }),
  getLevelSuccess: (data) => ({ type: 'GET_LEVEL_SUCCESS', data }),
  getLevelError: (error) => ({ type: 'GET_LEVEL_ERROR', error }),

  createLevelBegin: () => ({ type: 'CREATE_LEVEL_BEGIN' }),
  createLevelSuccess: (data) => ({ type: 'CREATE_LEVEL_SUCCESS', data }),
  createLevelError: (error) => ({ type: 'CREATE_LEVEL_ERROR', error }),

  updateLevelBegin: () => ({ type: 'UPDATE_LEVEL_BEGIN' }),
  updateLevelSuccess: (data) => ({ type: 'UPDATE_LEVEL_SUCCESS', data }),
  updateLevelError: (error) => ({ type: 'UPDATE_LEVEL_ERROR', error }),

  setSelectedLevel: (level) => ({ type: 'SET_SELECTED_LEVEL', level }),
  cleanLevelForm: () => ({ type: 'CLEAN_LEVEL_FORM' }),
};

export default actions;
