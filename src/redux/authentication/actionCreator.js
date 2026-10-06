import Cookies from 'js-cookie';
import actions from './actions';
import { setItem } from '../../utility/localStorageControl';
import { DataService } from '../../config/dataService/dataService';
import { ADMIN, COOKIE_WEB, TOKEN_WEB } from '../../config/variable/variable';

const {
  loginBegin,
  loginSuccess,
  loginError,
  clearLoginForm,
  changeScreen,
  sendEmailBegin,
  sendEmailSuccess,
  sendEmailError,
  validateCodeBegin,
  validateCodeSuccess,
  validateCodeError,
  changePasswordBegin,
  changePasswordSuccess,
  changePasswordError
} = actions;

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

const handleChangeScreen = (value) => {
  return async (dispatch) => {
    dispatch(changeScreen(value));
  };
};

const sendEmail = (values) => {
  return async (dispatch) => {
    try {
      dispatch(sendEmailBegin());
      const response = await DataService.postAuth('/send_code', values, process.env.REACT_APP_API_AUTH);
      if (response.data?.success) {
        dispatch(sendEmailSuccess({
          email: values?.email,
          message: response.data?.message
        }));
      } else {
        dispatch(sendEmailError(response.data?.error || 'Error al enviar código'));
      }
    } catch (err) {
      dispatch(
        sendEmailError(err.response?.data?.data?.error || 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const validateCode = (values) => {
  return async (dispatch) => {
    try {
      dispatch(validateCodeBegin());
      const response = await DataService.postAuth('/validate_code', values, process.env.REACT_APP_API_AUTH);
      if (response.data?.success) {
        dispatch(validateCodeSuccess({
          code: values?.code,
          message: response.data?.message
        }));
      } else {
        dispatch(validateCodeError(response.data?.error || 'Error al validar token'));
      }
    } catch (err) {
      dispatch(
        validateCodeError(err.response?.data?.data?.error || 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const changePassword = (values) => {
  return async (dispatch) => {
    try {
      dispatch(changePasswordBegin());
      const response = await DataService.postAuth('/change_password', values, process.env.REACT_APP_API_AUTH);
      if (response.data?.success) {
        dispatch(changePasswordSuccess({
          message: response.data?.message
        }));
      } else {
        dispatch(changePasswordError(response.data?.error || 'Error al cambiar contraseña'));
      }
    } catch (err) {
      dispatch(
        changePasswordError(err.response?.data?.data?.error || 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

export { loginUser, cleanLogin, handleChangeScreen, sendEmail, validateCode, changePassword };
