const actions = {
  getTipsBegin: () => ({ type: 'GET_TIPS_BEGIN' }),
  getTipsSuccess: (data) => ({ type: 'GET_TIPS_SUCCESS', data }),
  getTipsError: (error) => ({ type: 'GET_TIPS_ERROR', error }),

  createTipBegin: () => ({ type: 'CREATE_TIP_BEGIN' }),
  createTipSuccess: (data) => ({ type: 'CREATE_TIP_SUCCESS', data }),
  createTipError: (error) => ({ type: 'CREATE_TIP_ERROR', error }),

  cleanTipForm: () => ({ type: 'CLEAN_TIP_FORM' }),
};

export default actions;
