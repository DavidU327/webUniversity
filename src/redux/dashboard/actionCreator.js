import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const { getAllUsers, getAllOrders, getAllCollectors, totalUserOrder, totalCollectorOrder, dateUserOrder, totalUserLevel} = actions;

const getAllUsersDashboard = () => {
  const url = process.env.REACT_APP_API_USERS;
  return async (dispatch) => {
    const response = await DataService.get(`/all_users`, url);
    if (response?.data?.totalUsers) {
      dispatch(getAllUsers(response.data.totalUsers));
    }
  };
};

const getAllOrdersDashboard = () => {
  const url = process.env.REACT_APP_API_ORDER;
  return async (dispatch) => {
    const response = await DataService.get(`/all_orders`, url);
    if (response?.data) {
      dispatch(getAllOrders({ orders: response.data.orders, stateOrders: response.data.stateOrders }));
    }
  };
};

const getAllCollectorsDashboard = () => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    const response = await DataService.get(`/all_collectors`, url);
    if (response?.data?.totalCollector) {
      dispatch(getAllCollectors(response.data.totalCollector));
    }
  };
};

const totalUserOrderDashboard = () => {
  const url = process.env.REACT_APP_API_ORDER;
  return async (dispatch) => {
    const response = await DataService.get(`/total_users`, url);
    if (response?.data?.users.length > 0) {
      dispatch(totalUserOrder(response.data.users));
    }
  };
}

const totalCollectorOrderDashboard = () => {
  const url = process.env.REACT_APP_API_ORDER;
  return async (dispatch) => {
    const response = await DataService.get(`/total_collectors`, url);
    if (response?.data?.collectors.length > 0) {
      dispatch(totalCollectorOrder(response.data.collectors));
    }
  };
};

const dateUserOrderDashboard = () => {
  const url = process.env.REACT_APP_API_ORDER;
  return async (dispatch) => {
    const response = await DataService.get(`/last_date_users`, url);
    if (response?.data?.users.length > 0) {
      dispatch(dateUserOrder(response.data.users));
    }
  };
};


const totalUserLevelDashboard = () => {
  const url = process.env.REACT_APP_API_LEVEL;
  return async (dispatch) => {
    const response = await DataService.get(`/level-user-dashboard`, url);
    if (response?.data?.length > 0) {
      dispatch(totalUserLevel(response.data));
    }
  };
};


export {
  getAllUsersDashboard,
  getAllOrdersDashboard,
  getAllCollectorsDashboard,
  totalUserOrderDashboard,
  totalCollectorOrderDashboard,
  dateUserOrderDashboard,
  totalUserLevelDashboard,
};
