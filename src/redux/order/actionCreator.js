import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getOrderDaysBegin,
  getOrderDaysSuccess,
  getOrderDaysError,
} = actions;

const BASE_URL = process.env.REACT_APP_API_ORDER;
/**
 * Listar ordenes del día
 */
const getOrderDays = (day) => {
  return async (dispatch) => {
    try {
      dispatch(getOrderDaysBegin());
      const response = await DataService.get(`/orders/dashboard?date=${day}`, BASE_URL);
      if (response.data) {
        dispatch(getOrderDaysSuccess(response.data));
      } else {
        dispatch(getOrderDaysError('Error al obtener las ordenes'));
      }
    } catch (err) {
      dispatch(getOrderDaysError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

export {
  getOrderDays,
};
