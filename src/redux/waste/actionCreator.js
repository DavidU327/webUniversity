import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getWasteBegin,
  getWasteSuccess,
  getWasteError,
  createWasteBegin,
  createWasteSuccess,
  createWasteError,
  updateWasteBegin,
  updateWasteSuccess,
  updateWasteError,
  toggleStatusWasteBegin,
  toggleStatusWasteSuccess,
  toggleStatusWasteError,
  deleteWasteBegin,
  deleteWasteSuccess,
  deleteWasteError,
  setSelectedWaste,
  cleanWasteForm,
} = actions;

const BASE_URL = process.env.REACT_APP_API_WASTE;

/**
 * Listar todos los residuos
 */
const getWastes = () => {
  return async (dispatch) => {
    try {
      dispatch(getWasteBegin());
      const response = await DataService.get('/type-wastes', BASE_URL);
      if (response.data) {
        dispatch(getWasteSuccess(response.data));
      } else {
        dispatch(getWasteError('Error al obtener los residuos'));
      }
    } catch (err) {
      dispatch(getWasteError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Crear un nuevo residuo
 */
const createWaste = (params, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(createWasteBegin());
      const response = await DataService.post('/type-wastes', params, BASE_URL);
      if (response.data) {
        dispatch(createWasteSuccess(response.data));
        if (onSuccess) onSuccess();
        dispatch(getWastes());
      } else {
        dispatch(createWasteError('Error al crear el residuo'));
      }
    } catch (err) {
      dispatch(createWasteError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Actualizar un residuo
 */
const updateWaste = (id, params, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(updateWasteBegin());
      const response = await DataService.put(`/type-wastes/${id}`, params, BASE_URL);
      if (response.data) {
        dispatch(updateWasteSuccess(response.data));
        if (onSuccess) onSuccess();
        dispatch(getWastes());
      } else {
        dispatch(updateWasteError('Error al actualizar el residuo'));
      }
    } catch (err) {
      dispatch(updateWasteError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Cambiar estado (toggle) de un residuo
 */
const toggleStatusWaste = (id) => {
  return async (dispatch) => {
    try {
      dispatch(toggleStatusWasteBegin());
      const response = await DataService.patch(`/type-wastes/${id}/toggle-status`, {}, BASE_URL);
      if (response.data) {
        dispatch(toggleStatusWasteSuccess(response.data));
        dispatch(getWastes());
      } else {
        dispatch(toggleStatusWasteError('Error al cambiar el estado del residuo'));
      }
    } catch (err) {
      dispatch(toggleStatusWasteError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Eliminar un residuo
 */
const deleteWaste = (id, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(deleteWasteBegin());
      await DataService.delete(`/type-wastes/${id}`, {}, BASE_URL);
      dispatch(deleteWasteSuccess(id));
      if (onSuccess) onSuccess();
      dispatch(getWastes());
    } catch (err) {
      dispatch(deleteWasteError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Seleccionar un residuo para editar
 */
const selectWaste = (waste) => {
  return (dispatch) => {
    dispatch(setSelectedWaste(waste));
  };
};

/**
 * Limpiar formulario
 */
const cleanWasteFormAction = () => {
  return (dispatch) => {
    dispatch(cleanWasteForm());
  };
};

export {
  getWastes,
  createWaste,
  updateWaste,
  toggleStatusWaste,
  deleteWaste,
  selectWaste,
  cleanWasteFormAction,
};
