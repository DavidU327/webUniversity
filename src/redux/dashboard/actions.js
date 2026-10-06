const actions = {
  GET_ALL_USERS: 'GET_ALL_USERS',
  GET_ALL_ORDERS: 'GET_ALL_ORDERS',
  GET_ALL_COLLECTORS: 'GET_ALL_COLLECTORS',
  TOTAL_USER_ORDER: 'TOTAL_USER_ORDER',
  TOTAL_COLLECTOR_ORDER: 'TOTAL_COLLECTOR_ORDER',
  DATE_USER_ORDER: 'DATE_USER_ORDER',
  TOTAL_USER_LEVEL: 'TOTAL_USER_LEVEL',

  getAllUsers: (data) => {
    return {
      type: actions.GET_ALL_USERS,
      data,
    };
  },

  getAllOrders: (data) => {
    return {
      type: actions.GET_ALL_ORDERS,
      data,
    };
  },

  getAllCollectors: (data) => {
    return {
      type: actions.GET_ALL_COLLECTORS,
      data,
    };
  },

  totalUserOrder: (data) => {
    return {
      type: actions.TOTAL_USER_ORDER,
      data,
    };
  },

  totalCollectorOrder: (data) => {
    return {
      type: actions.TOTAL_COLLECTOR_ORDER,
      data,
    };
  },

  dateUserOrder: (data) => {
    return {
      type: actions.DATE_USER_ORDER,
      data,
    };
  },

  totalUserLevel: (data) => {
    return {
      type: actions.TOTAL_USER_LEVEL,
      data,
    };
  },
};

export default actions;
