import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const {
  getBlogsBegin,
  getBlogsSuccess,
  getBlogsError,
  createBlogBegin,
  createBlogSuccess,
  createBlogError,
  updateBlogBegin,
  updateBlogSuccess,
  updateBlogError,
  changeStateBlogBegin,
  changeStateBlogSuccess,
  changeStateBlogError,
  cleanBlogForm,
} = actions;

const BASE_URL = process.env.REACT_APP_API_BLOG;

/**
 * Listar todos los blogs
 */
const getBlogs = () => {
  return async (dispatch) => {
    try {
      dispatch(getBlogsBegin());
      const response = await DataService.get('/blogs_web', BASE_URL);
      if (response.data) {
        dispatch(getBlogsSuccess(response.data));
      } else {
        dispatch(getBlogsError('Error al obtener los blogs'));
      }
    } catch (err) {
      dispatch(getBlogsError(err.response?.data?.message || 'Error de servidor. Intenta de nuevo.'));
    }
  };
};

/**
 * Crear un nuevo blog
 */
const createBlog = (params) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("description", params.description);
    formData.append("url", params.url);
    formData.append("image", params.imageUrl.file);
    try {
      dispatch(createBlogBegin());
      const response = await DataService.postFormData('/blogs_web', formData ,BASE_URL);
      if (response?.data?.blog) {
        dispatch(createBlogSuccess(
          {
            data: response?.data?.blog,
            message: response?.message,
          }));
      } else {
        dispatch(createBlogError(response.data?.error || 'Error al crear blog'));
      }
    } catch (err) {
      dispatch(
        createBlogError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

/**
 * Actualizar un blog
 */
const updatedBlog = (params, id) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("description", params.description);
    formData.append("url", params.url);
    if(params.imageUrl !== null) {
      formData.append("image", params.imageUrl.file);
    }
    formData.append("_method", 'patch');
    try {
      dispatch(updateBlogBegin());
      const response = await DataService.postFormData(`${id}/blogs_web`, formData ,BASE_URL);
      if (response?.data?.blog) {
        dispatch(updateBlogSuccess(
          {
            id,
            data: response?.data?.blog,
            message: response?.data?.message,
          }));
      } else {
        dispatch(updateBlogError(response.data?.error || 'Error al actualizar blog'));
      }
    } catch (err) {
      dispatch(
        updateBlogError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

/**
 * Cambiar estado de un blog
 */
const changeStateBlog = (id) => {
  return async (dispatch) => {
    try {
      dispatch(changeStateBlogBegin());
      const response = await DataService.patch(`${id}/change_state_blogs`, {},BASE_URL);
      if (response?.data?.blog) {
        dispatch(changeStateBlogSuccess(
          {
            id,
            data: response?.data?.blog,
            message: response?.data?.message,
          }));
      } else {
        dispatch(changeStateBlogError(response.data?.error || 'Error al cambiar estado blog'));
      }
    } catch (err) {
      dispatch(
        changeStateBlogError(err.response?.error|| 'Error de servidor. Intenta de nuevo.')
      );
    }
  };
};

/**
 * Limpiar formulario
 */
const cleanBlogFormAction = () => {
  return (dispatch) => {
    dispatch(cleanBlogForm());
  };
};

export {
  getBlogs,
  createBlog,
  updatedBlog,
  changeStateBlog,
  cleanBlogFormAction,
};
