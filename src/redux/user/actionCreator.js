import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getUsersBegin,
  getUsersSuccess,
  getUsersError,
  changeStateBegin,
  changeStateSuccess,
  changeStateError,
  searchUserBegin,
  searchUserSuccess,
  searchUserError,
  cleanForm,
  deleteUserBegin,
  deleteUserSuccess,
  deleteUserError,
} = actions;

const getUsers = (page) => {
  const url = process.env.REACT_APP_API_USERS;
  return async (dispatch) => {
    try {
      dispatch(getUsersBegin());
      const response = await DataService.get(`/users?page=${page}`, url);
      if (response.data.data?.length > 0) {
        dispatch(getUsersSuccess(response.data));
      } else {
        dispatch(getUsersError(response.data?.error || 'Error al traer datos'));
      }
    } catch (err) {
      dispatch(
        getUsersError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const changeStateUser = (userId) => {
  const url = process.env.REACT_APP_API_USERS;
  return async (dispatch) => {
    try {
      dispatch(changeStateBegin());
      const response = await DataService.get(`/change_state/${userId}` ,url);
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

const searchUser = (query, page) => {
  const url = process.env.REACT_APP_API_USERS;
  return async (dispatch) => {
    try {
      dispatch(searchUserBegin());
      const response = await DataService.post(`/search?page=${page}`, query, url);
      if (response.data.data?.length > 0) {
        dispatch(searchUserSuccess(response.data));
      } else {
        dispatch(searchUserError(response.data?.error || 'Error al traer datos'));
      }
    } catch (err) {
      dispatch(
        searchUserError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

const cleanFormUser = () => {
  return async (dispatch) => {
    dispatch(cleanForm());
  };
};

const deleteUser = (id) => {
  const url = process.env.REACT_APP_API_USERS;
  return async (dispatch) => {
    try {
      dispatch(deleteUserBegin());
      const response = await DataService.delete(`/delete_user/${id}`, {}, url);
      if (response.data.code === 200) {
        dispatch(deleteUserSuccess(response.data));
      } else {
        dispatch(deleteUserError(response.data?.error || 'Error al eliminar recolector'));
      }
    } catch (err) {
      dispatch(
        deleteUserError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

export {
  getUsers,
  changeStateUser,
  searchUser,
  cleanFormUser,
  deleteUser,
};
