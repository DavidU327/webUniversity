import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getLevelBegin,
  getLevelSuccess,
  getLevelError,
  createLevelBegin,
  createLevelSuccess,
  createLevelError,
  updateLevelBegin,
  updateLevelSuccess,
  updateLevelError,
  setSelectedLevel,
  cleanLevelForm,
} = actions;

const BASE_URL = process.env.REACT_APP_API_LEVEL;
/**
 * Listar todos los niveles
 */
const getLevels = () => {
  return async (dispatch) => {
    try {
      dispatch(getLevelBegin());
      const response = await DataService.get('/levels', BASE_URL);
      if (response.data) {
        dispatch(getLevelSuccess(response.data));
      } else {
        dispatch(getLevelError('Error al obtener los niveles'));
      }
    } catch (err) {
      dispatch(getLevelError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Crear un nuevo nivel
 */
const createLevel = (params, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(createLevelBegin());
      const response = await DataService.post('/levels', params, BASE_URL);
      if (response.data) {
        dispatch(createLevelSuccess(response.data));
        if (onSuccess) onSuccess();
        dispatch(getLevels());
      } else {
        dispatch(createLevelError('Error al crear el nivel'));
      }
    } catch (err) {
      dispatch(createLevelError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Actualizar un nivel
 */
const updateLevel = (id, params, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(updateLevelBegin());
      const response = await DataService.put(`/levels/${id}`, params, BASE_URL);
      if (response.data) {
        dispatch(updateLevelSuccess(response.data));
        if (onSuccess) onSuccess();
        dispatch(getLevels());
      } else {
        dispatch(updateLevelError('Error al actualizar el nivel'));
      }
    } catch (err) {
      dispatch(updateLevelError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Seleccionar un nivel para editar
 */
const selectLevel = (level) => {
  return (dispatch) => {
    dispatch(setSelectedLevel(level));
  };
};

/**
 * Limpiar formulario
 */
const cleanLevelFormAction = () => {
  return (dispatch) => {
    dispatch(cleanLevelForm());
  };
};

export {
  getLevels,
  createLevel,
  updateLevel,
  selectLevel,
  cleanLevelFormAction,
};
