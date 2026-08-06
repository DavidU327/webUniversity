
const initialState = {
  tips: [],
  loading: false,
  error: null,
  prev: false,
  next: false,
  currentPage: 1,
  loadingForm: false,
  successForm: false,
  errorForm: null,
  message: '',
};

export default function tipReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_TIPS_BEGIN':
      return { ...state, loading: true, error: null };
    case 'GET_TIPS_SUCCESS':
      return {
        ...state,
        tips: action.data.data,
        prev: action.data.links.prev !== null,
        next: action.data.links.next !== null,
        currentPage: action.data.meta.current_page,
        loading: false
      };
    case 'GET_TIPS_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'CREATE_TIP_BEGIN':
      return { ...state, loadingForm: true, errorForm: null };
    case 'CREATE_TIP_SUCCESS':
      return {
        ...state,
        loadingForm: false,
        successForm: true,
        message: action.data.message,
        tips: [action.data.data, ...state.tips]
      };
    case 'CREATE_TIP_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };
    case 'CLEAN_TIP_FORM':
      return { ...state, loadingForm: false, successForm: false, errorForm: null };
    default:
      return state;
  }
}
