import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const { getTypeIdentificationsBegin, getTypeIdentificationsSuccess, getTypeIdentificationsError } = actions;



const getTypeIdentifications = () => {

  const url = process.env.REACT_APP_API_AUTH;
  return async (dispatch) => {
    try {
      dispatch(getTypeIdentificationsBegin());
      const response = await DataService.get('/type_identifications', url);
      if (response.data?.length > 0) {
        dispatch(getTypeIdentificationsSuccess(response.data));
      } else {
        dispatch(getTypeIdentificationsError(response.data?.error || 'Error al traer los tipos de identificación'));
      }
    } catch (err) {
      dispatch(
        getTypeIdentificationsError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};


export { getTypeIdentifications };
