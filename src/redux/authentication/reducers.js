import Cookies from 'js-cookie';
import actions from './actions';
import { COOKIE_WEB } from '../../config/variable/variable';

const {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  CHANGE_SCREEN,
  SEND_EMAIL_BEGIN,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  VALIDATE_CODE_BEGIN,
  VALIDATE_CODE_SUCCESS,
  VALIDATE_CODE_ERROR,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} = actions;

const initState = {
  login: COOKIE_WEB
    ? Cookies.get(COOKIE_WEB)
    : null,
  loading: false,
  error: null,
  screen: 'forgot',
  email: '',
  code: '',
  message: '',
};

const AuthReducer = (state = initState, action) => {
  const { type, data, err, value } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: null,
        login: false,
      };
    case CHANGE_SCREEN:
      return {
        ...state,
        screen: value,
      };
    case SEND_EMAIL_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        email: data.email,
        message: data.message,
        screen: 'validate',
      };
    case SEND_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: err,
      };
    case VALIDATE_CODE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case VALIDATE_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        code: data.code,
        message: data.message,
        screen: 'reset',
      };
    case VALIDATE_CODE_ERROR:
      return {
        ...state,
        loading: false,
        error: err,
      };
    case CHANGE_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        code: '',
        email: '',
        message: data.message,
        screen: 'forgot',
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: err,
      };
    default:
      return state;
  }
};
export default AuthReducer;
