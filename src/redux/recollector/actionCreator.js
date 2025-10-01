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
  uploadDocumentBegin,
  uploadDocumentSuccess,
  uploadDocumentError,
  getStatesBegin,
  getStatesSuccess,
  getStatesError,
  changeStateListBegin,
  changeStateListSuccess,
  changeStateListError,
  changeStateBegin,
  changeStateSuccess,
  changeStateError,
  updateRecollectorBegin,
  updateRecollectorSuccess,
  updateRecollectorError,
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
        dispatch(createRecollectorSuccess(
          {
            data: response?.data?.user,
            message: response?.message,
          }));
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

const uploadDocument = (params) => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    const formData = new FormData();
    if(params.type === 'document_identification'){
      formData.append('identification_document', params.document.file);
    }
    if(params.type === 'document_driving_license'){
      formData.append('driving_license_document', params.document.file);
    }
    try {
      dispatch(uploadDocumentBegin());
      const response = await DataService.postFormData(`/upload-document/${params.id}`, formData ,url);
      if (response?.data?.data?.url) {
        dispatch(uploadDocumentSuccess({
          url:response?.data?.data?.url,
          id: params.id,
          type: params.type === 'document_identification' ? 'identification_document' : 'driving_license_document',
          message: response?.data?.message,
          },
        ));
      } else {
        dispatch(uploadDocumentError(response.data?.error || 'Error al subir documento'));
      }
    } catch (err) {
      dispatch(
        uploadDocumentError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const getRecollectorStates = () => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    try {
      dispatch(getStatesBegin());
      const response = await DataService.get(`/states_collector`, url);
      if (response.data.state?.length > 0) {
        dispatch(getStatesSuccess(response.data.state));
      } else {
        dispatch(getStatesError(response.data?.error || 'Error al traer datos'));
      }
    } catch (err) {
      dispatch(
        getStatesError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const changeStateListRecollector = (stateId, recollectorId) => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    try {
      dispatch(changeStateListBegin());
      const response = await DataService.get(`/change_state_collector/${stateId}/${recollectorId}` ,url);
      if (response?.data?.code === 200) {
        dispatch(changeStateListSuccess({
            state: response?.data?.data?.state,
            id: response?.data?.data?.id,
            message: response?.data?.message,
          },
        ));
      } else {
        dispatch(changeStateListError(response.data?.error || 'Error al subir documento'));
      }
    } catch (err) {
      dispatch(
        changeStateListError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const changeStateRecollector = (recollectorId) => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    try {
      dispatch(changeStateBegin());
      const response = await DataService.get(`/change_state/${recollectorId}` ,url);
      if (response?.data?.code === 200) {
        dispatch(changeStateSuccess({
            state: response?.data?.data?.state,
            id: response?.data?.data?.id,
            message: response?.data?.message,
          },
        ));
      } else {
        dispatch(changeStateError(response.data?.error || 'Error al subir documento'));
      }
    } catch (err) {
      dispatch(
        changeStateError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const updateRecollector = (id, params, defaultUser) => {
  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("_method", 'PATCH');
    if(params.name){
      formData.append("name", params.name);
    }
    if(params.phone){
      formData.append("phone", params.phone);
    }
    if(params.identification !== defaultUser.identification){
      formData.append("identification", params.identification);
    }
    if(params.type_identification){
      formData.append("type_identification", params.type_identification);
    }
   if(params.email !== defaultUser.email){
     formData.append("email", params.email);
   }
   if(params.imageUrl?.file){
     formData.append("images", params.imageUrl.file);
   }
    if(params.documentIdentification?.file){
      formData.append("identification_document", params.documentIdentification.file);
    }
    if(params.documentDriving?.file){
      formData.append("driving_license_document", params.documentDriving.file);
    }
    try {
      dispatch(updateRecollectorBegin());
      const response = await DataService.postFormData(`/collector/${id}`, formData ,url);
      if (response?.data?.user) {
        dispatch(updateRecollectorSuccess(
          {
            data: response?.data?.user,
            id,
            message: response?.data?.message,
          }));
      } else {
        dispatch(updateRecollectorError(response.data?.error || 'Error al actualizar recolector'));
      }
    } catch (err) {
      dispatch(
        updateRecollectorError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

export {
  getRecollector,
  createRecollector,
  cleanFormRecollector,
  uploadDocument,
  getRecollectorStates,
  changeStateListRecollector,
  changeStateRecollector,
  updateRecollector,
};
