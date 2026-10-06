import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getTipsBegin,
  getTipsSuccess,
  getTipsError,
  createTipBegin,
  createTipSuccess,
  createTipError,
  updateTipBegin,
  updateTipSuccess,
  updateTipError,
  changeStateTipBegin,
  changeStateTipSuccess,
  changeStateTipError,
  cleanTipForm,
} = actions;

const BASE_URL = process.env.REACT_APP_API_TIP;

/**
 * Listar todos los tips
 */
const getTips = () => {
  return async (dispatch) => {
    try {
      dispatch(getTipsBegin());
      const response = await DataService.get('/tips_web', BASE_URL);
      if (response.data) {
        dispatch(getTipsSuccess(response.data));
      } else {
        dispatch(getTipsError('Error al obtener los tips'));
      }
    } catch (err) {
      dispatch(getTipsError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Crear un nuevo tip
 */
const createTip = (body) => {
  return async (dispatch) => {
    try {
      dispatch(createTipBegin());
      const response = await DataService.post('/tips_web', body ,BASE_URL);
      if (response?.data?.tip) {
        dispatch(createTipSuccess(
          {
            data: response?.data?.tip,
            message: response?.message,
          }));
      } else {
        dispatch(createTipError(response.data?.error || 'Error al crear tip'));
      }
    } catch (err) {
      dispatch(
        createTipError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

/**
 * Actualizar un tip
 */
const updateTip = (id, values) => {
  return async (dispatch) => {
    try {
      dispatch(updateTipBegin());
      const response = await DataService.patch(`/${id}/tips_web`, values ,BASE_URL);
      if (response?.data?.tip) {
        dispatch(updateTipSuccess(
          {
            id,
            data: response?.data?.tip,
            message: response?.message,
          }));
      } else {
        dispatch(updateTipError(response.data?.error || 'Error al actualizar un tip'));
      }
    } catch (err) {
      dispatch(
        updateTipError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

/**
 * Cambiar estado de un blog
 */
const changeStateTip = (id) => {
  return async (dispatch) => {
    try {
      dispatch(changeStateTipBegin());
      const response = await DataService.patch(`${id}/change_state_tips`, {},BASE_URL);
      if (response?.data?.tip) {
        dispatch(changeStateTipSuccess(
          {
            id,
            data: response?.data?.tip,
            message: response?.data?.message,
          }));
      } else {
        dispatch(changeStateTipError(response.data?.error || 'Error al cambiar estado tip'));
      }
    } catch (err) {
      dispatch(
        changeStateTipError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};


/**
 * Limpiar formulario
 */
const cleanTipFormAction = () => {
  return (dispatch) => {
    dispatch(cleanTipForm());
  };
};

export {
  getTips,
  createTip,
  updateTip,
  changeStateTip,
  cleanTipFormAction,
};
