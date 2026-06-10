import actions from './actions';
import { DataService } from '../../config/dataService/dataService';
import { openNotification } from '../../utility/notification';

const {
  getOrderDaysBegin,
  getOrderDaysSuccess,
  getOrderDaysError,
  getOrdersBegin,
  getOrdersSuccess,
  getOrdersError,
  assignedOrderBegin,
  assignedOrderSuccess,
  assignedOrderError,
  initOrderBegin,
  initOrderSuccess,
  initOrderError,
  cancelOrderBegin,
  cancelOrderSuccess,
  cancelOrderError,
  finishOrderBegin,
  finishOrderSuccess,
  finishOrderError,
  cleanOrder,
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
 * Ver todas las ordenes
 */
const getOrders = (page) => {
  return async (dispatch) => {
    try {
      dispatch(getOrdersBegin());
      const response = await DataService.get(`/orders?page=${page}&limit=10`, BASE_URL);
      if (response.data) {
        dispatch(getOrdersSuccess(response.data));
      } else {
        dispatch(getOrdersError('Error al obtener las ordenes'));
      }
    } catch (err) {
      dispatch(getOrdersError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
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
          "success",
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

/**
 * Iniciar ordenes
 */
const initOrder = (values) => {
  return async (dispatch) => {
    try {
      dispatch(initOrderBegin());
      const response = await DataService.post('orders/init', values, BASE_URL);
      if (response.data) {
        dispatch(initOrderSuccess(response.data));
      } else {
        dispatch(initOrderError('Error al iniciar ordenes'));
      }
    } catch (err) {
      dispatch(initOrderError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Cancelar orden
 */
const cancelOrder = (order) => {
  return async (dispatch) => {
    try {
      const body = {
        order_id: order,
      };
      dispatch(cancelOrderBegin());
      const response = await DataService.post('orders/cancel', body, BASE_URL);
      if (response.data) {
        dispatch(cancelOrderSuccess(response.data));
        openNotification(
          "success",
          "Listo",
          "Órden cancelada"
        );
      } else {
        dispatch(cancelOrderError('Error al cancelar órden'));
      }
    } catch (err) {
      dispatch(cancelOrderError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Finalizar orden
 */
const finishOrder = (values) => {
  return async (dispatch) => {
    try {
      dispatch(finishOrderBegin());
      const response = await DataService.post('orders/finish', values, BASE_URL);
      if (response.data) {
        dispatch(finishOrderSuccess(response.data));
        openNotification(
          "success",
          "Listo",
          "Órden finalizada"
        );
      } else {
        dispatch(finishOrderError('Error al finalizar órden'));
      }
    } catch (err) {
      dispatch(finishOrderError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Limpiar
 */
const clearOrder = () => {
  return async (dispatch) => {
    dispatch(cleanOrder());
  };
};

export {
  assignedCollector,
  getOrderDays,
  getOrders,
  initOrder,
  cancelOrder,
  clearOrder,
  finishOrder,
};
