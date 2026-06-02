const actions = {
  getOrderDaysBegin: () => ({ type: 'GET_ORDER_DAYS_BEGIN' }),
  getOrderDaysSuccess: (data) => ({ type: 'GET_ORDER_DAYS_SUCCESS', data }),
  getOrderDaysError: (error) => ({ type: 'GET_ORDER_DAYS_ERROR', error }),

  assignedOrderBegin: () => ({ type: 'ASSIGNED_ORDER_BEGIN' }),
  assignedOrderSuccess: (data) => ({ type: 'ASSIGNED_ORDER_SUCCESS', data }),
  assignedOrderError: (error) => ({ type: 'ASSIGNED_ORDER_ERROR', error}),

  initOrderBegin: () => ({ type: 'INIT_ORDER_BEGIN' }),
  initOrderSuccess: (data) => ({ type: 'INIT_ORDER_SUCCESS', data }),
  initOrderError: (error) => ({ type: 'INIT_ORDER_ERROR', error}),

  cleanOrder: () => ({ type: 'CLEAN_ORDER'}),
};

export default actions;
