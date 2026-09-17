import actions from './actions';

const {
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
} = actions;

const initState = {
  totalUsers: 0,
};

const DashboardReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_ALL_USERS_BEGIN:
      return {
        ...state,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        totalUsers: data,
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default DashboardReducer;
