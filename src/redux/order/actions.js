const actions = {
  getOrderDaysBegin: () => ({ type: 'GET_ORDER_DAYS_BEGIN' }),
  getOrderDaysSuccess: (data) => ({ type: 'GET_ORDER_DAYS_SUCCESS', data }),
  getOrderDaysError: (error) => ({ type: 'GET_ORDER_DAYS_ERROR', error }),
};

export default actions;
