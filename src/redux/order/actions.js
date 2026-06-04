const actions = {
  getOrderDaysBegin: () => ({ type: 'GET_ORDER_DAYS_BEGIN' }),
  getOrderDaysSuccess: (data) => ({ type: 'GET_ORDER_DAYS_SUCCESS', data }),
  getOrderDaysError: (error) => ({ type: 'GET_ORDER_DAYS_ERROR', error }),

  getOrdersBegin: () => ({ type: 'GET_ORDERS_BEGIN' }),
  getOrdersSuccess: (data) => ({ type: 'GET_ORDERS_SUCCESS', data }),
  getOrdersError: (error) => ({ type: 'GET_ORDERS_ERROR', error }),

  assignedOrderBegin: () => ({ type: 'ASSIGNED_ORDER_BEGIN' }),
  assignedOrderSuccess: (data) => ({ type: 'ASSIGNED_ORDER_SUCCESS', data }),
  assignedOrderError: (error) => ({ type: 'ASSIGNED_ORDER_ERROR', error}),

  initOrderBegin: () => ({ type: 'INIT_ORDER_BEGIN' }),
  initOrderSuccess: (data) => ({ type: 'INIT_ORDER_SUCCESS', data }),
  initOrderError: (error) => ({ type: 'INIT_ORDER_ERROR', error}),

  cancelOrderBegin: () => ({ type: 'CANCEL_ORDER_BEGIN' }),
  cancelOrderSuccess: (data) => ({ type: 'CANCEL_ORDER_SUCCESS', data }),
  cancelOrderError: (error) => ({ type: 'CANCEL_ORDER_ERROR', error}),

  cleanOrder: () => ({ type: 'CLEAN_ORDER'}),
};

export default actions;
