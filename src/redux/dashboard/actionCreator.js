import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getAllUsersBegin,
  getAllUsersSuccess,
  getAllUsersError
} = actions;

const getAllUsers = () => {
  const url = process.env.REACT_APP_API_USERS;
  return async (dispatch) => {
    try {
      dispatch(getAllUsersBegin());
      const response = await DataService.get(`/all_users`, url);
      if (response?.data?.totalUsers) {
        dispatch(getAllUsersSuccess(response.data.totalUsers));
      } else {
        dispatch(getAllUsersError(response.data?.error || 'Error al traer datos'));
      }
    } catch (err) {
      dispatch(getAllUsersError(err.response?.error || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

export { getAllUsers };
