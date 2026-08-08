const actions = {
  getTipsBegin: () => ({ type: 'GET_TIPS_BEGIN' }),
  getTipsSuccess: (data) => ({ type: 'GET_TIPS_SUCCESS', data }),
  getTipsError: (error) => ({ type: 'GET_TIPS_ERROR', error }),

  createTipBegin: () => ({ type: 'CREATE_TIP_BEGIN' }),
  createTipSuccess: (data) => ({ type: 'CREATE_TIP_SUCCESS', data }),
  createTipError: (error) => ({ type: 'CREATE_TIP_ERROR', error }),

  updateTipBegin: () => ({ type: 'UPDATE_TIP_BEGIN' }),
  updateTipSuccess: (data) => ({ type: 'UPDATE_TIP_SUCCESS', data }),
  updateTipError: (error) => ({ type: 'UPDATE_TIP_ERROR', error }),

  changeStateTipBegin: () => ({ type: 'CHANGE_STATE_TIP_BEGIN' }),
  changeStateTipSuccess: (data) => ({ type: 'CHANGE_STATE_TIP_SUCCESS', data }),
  changeStateTipError: (error) => ({ type: 'CHANGE_STATE_TIP_ERROR', error }),

  cleanTipForm: () => ({ type: 'CLEAN_TIP_FORM' }),
};

export default actions;
