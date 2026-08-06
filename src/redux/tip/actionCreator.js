import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getTipsBegin,
  getTipsSuccess,
  getTipsError,
  createTipBegin,
  createTipSuccess,
  createTipError,
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
  cleanTipFormAction,
};
