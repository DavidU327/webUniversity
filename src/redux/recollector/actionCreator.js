import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getRecollectorBegin,
  getRecollectorSuccess,
  getRecollectorError,
  createRecollectorBegin,
  createRecollectorSuccess,
  createRecollectorError,
  cleanForm,
} = actions;



const getRecollector = () => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    try {
      dispatch(getRecollectorBegin());
      const response = await DataService.get('/collectors', url);
      if (response.data.data?.length > 0) {
        dispatch(getRecollectorSuccess(response.data));
      } else {
        dispatch(getRecollectorError(response.data?.error || 'Error al traer datos'));
      }
    } catch (err) {
      dispatch(
        getRecollectorError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const createRecollector = (params) => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("phone", params.phone);
    formData.append("identification", params.identification);
    formData.append("type_identification", params.type_identification);
    formData.append("email", params.email);
    formData.append("images", params.imageUrl.file);
    if(params.documentIdentification){
      formData.append("identification_document", params.documentIdentification.file);
    }
    if(params.documentDriving){
      formData.append("driving_license_document", params.documentDriving.file);
    }
    try {
      dispatch(createRecollectorBegin());
      const response = await DataService.postFormData('/collector-backoffice', formData ,url);
      if (response?.data?.user) {
        dispatch(createRecollectorSuccess(response?.data?.user));
      } else {
        dispatch(createRecollectorError(response.data?.error || 'Error al crear recolector'));
      }
    } catch (err) {
      dispatch(
        createRecollectorError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const cleanFormRecollector = () => {
  return async (dispatch) => {
    dispatch(cleanForm());
  };
};

export { getRecollector, createRecollector, cleanFormRecollector };
