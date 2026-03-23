import Cookies from 'js-cookie';
import actions from './actions';
import { COOKIE_WEB } from '../../config/variable/variable';

const { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERROR, CLEAR_LOGIN_ERROR, } = actions;

const initState = {
  login: COOKIE_WEB
    ? Cookies.get(COOKIE_WEB)
    : null,
  loading: false,
  error: null,
};

const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
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
    default:
      return state;
  }
};
export default AuthReducer;
