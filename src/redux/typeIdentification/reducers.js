import actions from './actions';

const { GET_TYPE_IDENTIFICATIONS_BEGIN, GET_TYPE_IDENTIFICATIONS_SUCCESS, GET_TYPE_IDENTIFICATIONS_ERROR, } = actions;

const initState = {
  loading: false,
  typeIdentifications: [],
  error: null
};

const TypeIdentificationReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_TYPE_IDENTIFICATIONS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_TYPE_IDENTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        typeIdentifications: data,
      };
    case GET_TYPE_IDENTIFICATIONS_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default TypeIdentificationReducer;
