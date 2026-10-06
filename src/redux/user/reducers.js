import actions from './actions';

const {
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CHANGE_STATE_BEGIN,
  CHANGE_STATE_SUCCESS,
  CHANGE_STATE_ERROR,
  SEARCH_USER_BEGIN,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
  CLEAN_FORM,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} = actions;

const initState = {
  loading: false,
  users: [],
  error: null,
  prev: false,
  next: false,
  currentPage: 1,
  loadingForm: false,
  loadingState: false,
  successForm: false,
  message: '',
  errorChangeList: null,
};

const UserReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_USERS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: data.data,
        prev: data.links.prev !== null,
        next: data.links.next !== null,
        currentPage: data.meta.current_page
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CHANGE_STATE_BEGIN:
      return {
        ...state,
        loadingState: true,
      };
    case CHANGE_STATE_SUCCESS:
      return {
        ...state,
        loadingState: false,
        successForm: true,
        message: data.message,
        users: state.users.map((user) =>
          user.id === data.id
            ? {
              ...user,
              state: {
                ...data.state
              }
            }
            : user
        ),
      };
    case CHANGE_STATE_ERROR:
      return {
        ...state,
        loadingState: false,
        errorChangeList: err,
      };
    case SEARCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: data.data,
        prev: data.links.prev !== null,
        next: data.links.next !== null,
        currentPage: data.meta.current_page
      };
    case SEARCH_USER_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CLEAN_FORM:
      return {
        ...state,
        successForm: false,
        message: '',
      };
    case DELETE_USER_BEGIN:
      return {
        ...state,
        loadingForm: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loadingForm: false,
        successForm: true,
        message: data.message,
        users: state.users.filter(user => user.id !== data.id),
      }
    case DELETE_USER_ERROR:
      return {
        ...state,
        error: err,
        loadingForm: false,
      }
    default:
      return state;
  }
};
export default UserReducer;
