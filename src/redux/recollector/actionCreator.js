import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const { getRecollectorBegin, getRecollectorSuccess, getRecollectorError } = actions;



const getRecollector = () => {

  const url = process.env.REACT_APP_API_RECOLLECTOR;
  return async (dispatch) => {
    try {
      dispatch(getRecollectorBegin());
      const response = await DataService.get('/collectors', url);
      if (response.data.data?.length > 0) {
        dispatch(getRecollectorSuccess(response.data));
      } else {
        dispatch(getRecollectorError(response.data?.error || 'Error al iniciar sesión'));
      }
    } catch (err) {
      dispatch(
        getRecollectorError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};


export { getRecollector };
