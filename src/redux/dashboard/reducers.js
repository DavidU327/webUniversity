import actions from './actions';

const {
  GET_ALL_USERS,
  GET_ALL_ORDERS,
  GET_ALL_COLLECTORS,
  TOTAL_USER_ORDER,
  TOTAL_COLLECTOR_ORDER,
  DATE_USER_ORDER,
  TOTAL_USER_LEVEL,
} = actions;

const initState = {
  totalUsers: 0,
  totalOrders: 0,
  totalActivesOrder: 0,
  totalCollectors: 0,
  listTotalUser: [],
  listTotalCollectors: [],
  listDateUser: [],
  listTotalUserLevel: []
};

const DashboardReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        totalUsers: data,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        totalOrders: data.orders,
        totalActivesOrder: data.stateOrders,
      };
    case GET_ALL_COLLECTORS:
      return {
        ...state,
        totalCollectors: data,
      };
    case TOTAL_USER_ORDER:
      return {
        ...state,
        listTotalUser: data.map((item) => {
          return {
            id: item.user_id,
            label: item.name,
            value: item.total_orders,
          };
        }),
      };
    case TOTAL_COLLECTOR_ORDER:
      return {
        ...state,
        listTotalCollectors: data.map((item) => {
          return {
            id: item.collector_id,
            label: item.name,
            value: item.total_orders,
          };
        }),
      };
    case DATE_USER_ORDER:
      return {
        ...state,
        listDateUser: data.map((item) => {
          return {
            id: item.user_id,
            label: item.name,
            value: item.date.substring(0, 10),
          };
        }),
      };
    case TOTAL_USER_LEVEL:
      return {
        ...state,
        listTotalUserLevel: data.map((item) => {
          return {
            id: item.id,
            label: item.name,
            value: item.total_users,
          };
        }),
      };
    default:
      return state;
  }
};
export default DashboardReducer;
