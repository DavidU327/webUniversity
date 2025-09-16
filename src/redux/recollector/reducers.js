import actions from './actions';

const { GET_RECOLLECTOR_BEGIN, GET_RECOLLECTOR_SUCCESS, GET_RECOLLECTOR_ERROR, } = actions;

const initState = {
  loading: false,
  recollectors: [],
  error: null,
  prev: false,
  next: false,
  currentPage: 1,
};

const RecollectorReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_RECOLLECTOR_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_RECOLLECTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        recollectors: data.data,
        prev: data.links.prev !== null,
        next: data.links.next !== null,
        currentPage: data.meta.current_page
      };
    case GET_RECOLLECTOR_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default RecollectorReducer;
