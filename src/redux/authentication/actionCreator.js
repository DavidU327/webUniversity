import Cookies from 'js-cookie';
import actions from './actions';
import { setItem } from '../../utility/localStorageControl';
import { DataService } from '../../config/dataService/dataService';
import { ADMIN, COOKIE_WEB, TOKEN_WEB } from '../../config/variable/variable';

const { loginBegin, loginSuccess, loginError, clearLoginForm } = actions;

const loginUser = (credentials, remember) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      const response = await DataService.postAuth('/login', credentials, process.env.REACT_APP_API_AUTH);
      if (response.data?.success) {
        if(response.data.data.rol === ADMIN){
          const token = response.data.data.access_token;
          setItem(TOKEN_WEB, token);
          if(remember){
            Cookies.set(COOKIE_WEB, true);
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
