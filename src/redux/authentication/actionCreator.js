import Cookies from 'js-cookie';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';
import { setItem } from '../../utility/localStorageControl';
import { ADMIN } from '../../config/variable/variable';

const { loginBegin, loginSuccess, loginError, clearLoginForm } = actions;



const loginUser = (credentials, remember) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      const response = await DataService.postAuth('/login', credentials, process.env.REACT_APP_API_AUTH);
      if (response.data?.success) {
        if(response.data.data.rol === ADMIN){
          const token = response.data.data.access_token;
          setItem('@university_access_token', token);
          if(remember){
            Cookies.set('loginIn', true);
          }
          dispatch(loginSuccess(true));
        } else {
          dispatch(loginError('No tiene permisos para seguir'));
        }
      } else {
        dispatch(loginError(response.data?.error || 'Error al iniciar sesión'));
      }
    } catch (err) {
      dispatch(
        loginError(err.response?.data?.data?.error || 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const cleanLogin = () => {
  return async (dispatch) => {
    dispatch(clearLoginForm());
  };
};

export { loginUser, cleanLogin };
