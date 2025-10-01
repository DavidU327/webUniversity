import actions from './actions';

const { GET_RECOLLECTOR_BEGIN,
  GET_RECOLLECTOR_SUCCESS,
  GET_RECOLLECTOR_ERROR,
  CREATE_RECOLLECTOR_BEGIN,
  CREATE_RECOLLECTOR_SUCCESS,
  CREATE_RECOLLECTOR_ERROR,
  CLEAN_FORM,
  UPLOAD_DOCUMENT_BEGIN,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_ERROR,
  GET_STATES_BEGIN,
  GET_STATES_SUCCESS,
  GET_STATES_ERROR,
  CHANGE_STATE_LIST_BEGIN,
  CHANGE_STATE_LIST_SUCCESS,
  CHANGE_STATE_LIST_ERROR,
  CHANGE_STATE_BEGIN,
  CHANGE_STATE_SUCCESS,
  CHANGE_STATE_ERROR,
  UPDATE_RECOLLECTOR_BEGIN,
  UPDATE_RECOLLECTOR_SUCCESS,
  UPDATE_RECOLLECTOR_ERROR,
} = actions;

const initState = {
  loading: false,
  recollectors: [],
  error: null,
  prev: false,
  next: false,
  currentPage: 1,
  loadingForm: false,
  successForm: false,
  message: '',
  states: [],
  errorStates: null,
  errorChangeList: null,
  loadingState: false,
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
    case CREATE_RECOLLECTOR_BEGIN:
      return {
        ...state,
        loadingForm: true,
      };
    case CREATE_RECOLLECTOR_SUCCESS:
      return {
        ...state,
        loadingForm: false,
        successForm: true,
        message: data.message,
        recollectors: [data.data, ...state.recollectors]
      };
    case CREATE_RECOLLECTOR_ERROR:
      return {
        ...state,
        error: err,
        loadingForm: false,
      };
    case CLEAN_FORM:
      return {
        ...state,
        successForm: false,
        message: '',
      };
    case UPLOAD_DOCUMENT_BEGIN:
      return {
        ...state,
        loadingForm: true,
      };
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loadingForm: false,
        successForm: true,
        message: data.message,
        recollectors: state.recollectors.map((recollector) =>
          recollector.collector.id === data.id
            ? {
              ...recollector,
              collector: {
                ...recollector.collector,
                [data.type]: data.url,
              },
            }
            : recollector
        ),
      };
    case UPLOAD_DOCUMENT_ERROR:
      return {
        ...state,
        error: err,
        loadingForm: false,
      };
    case GET_STATES_BEGIN:
      return {
        ...state,
      };
    case GET_STATES_SUCCESS:
      return {
        ...state,
        states: data,
      };
    case GET_STATES_ERROR:
      return {
        ...state,
        errorStates: err,
      };
    case CHANGE_STATE_LIST_BEGIN:
      return {
        ...state,
        loadingForm: true,
      };
    case CHANGE_STATE_LIST_SUCCESS:
      return {
        ...state,
        loadingForm: false,
        successForm: true,
        message: data.message,
        recollectors: state.recollectors.map((recollector) =>
          recollector.collector.id === data.id
            ? {
              ...recollector,
              collector: {
                ...recollector.collector,
                state: {
                  ...data.state
                }
              },
            }
            : recollector
        ),
      };
    case CHANGE_STATE_LIST_ERROR:
      return {
        ...state,
        loadingForm: false,
        errorChangeList: err,
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
        recollectors: state.recollectors.map((recollector) =>
          recollector.collector.id === data.id
            ? {
              ...recollector,
              collector: {
                ...recollector.collector,
                state: {
                  ...data.state
                }
              },
            }
            : recollector
        ),
      };
    case CHANGE_STATE_ERROR:
      return {
        ...state,
        loadingState: false,
        errorChangeList: err,
      };
    case UPDATE_RECOLLECTOR_BEGIN:
      return {
        ...state,
        loadingForm: true,
      };
    case UPDATE_RECOLLECTOR_SUCCESS:
      return {
        ...state,
        loadingForm: false,
        successForm: true,
        message: data.message,
        recollectors: state.recollectors.map((recollector) =>
          recollector.collector.id === data.id
            ? data.data
            : recollector
        ),
      }
    case UPDATE_RECOLLECTOR_ERROR:
      return {
        ...state,
        error: err,
        loadingForm: false,
      }
    default:
      return state;
  }
};
export default RecollectorReducer;
