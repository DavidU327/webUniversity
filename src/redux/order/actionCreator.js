import actions from './actions';
import { DataService } from '../../config/dataService/dataService';
import { openNotification } from '../../utility/notification';

const {
  getOrderDaysBegin,
  getOrderDaysSuccess,
  getOrderDaysError,
  assignedOrderBegin,
  assignedOrderSuccess,
  assignedOrderError,
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

/**
 * Asignar recolector
 */
const assignedCollector = (order, collector) => {
  return async (dispatch) => {
    try {
      const body = {
        order_id: order,
        collector_id: collector
      };
      dispatch(assignedOrderBegin());
      const response = await DataService.post('orders/assign-collector', body, BASE_URL);
      if (response.data) {
        dispatch(assignedOrderSuccess(response.data));
        openNotification(
          "sucess",
          "Listo",
          "Recolector asignado"
        );
      } else {
        dispatch(assignedOrderError('Error al asignar recolector'));
      }
    } catch (err) {
      dispatch(assignedOrderError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};


export {
  assignedCollector,
  getOrderDays,
};
