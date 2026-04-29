
const initialState = {
  levels: [],
  loading: false,
  error: null,
  loadingForm: false,
  successForm: false,
  errorForm: null,
  selectedLevel: null,
};

export default function levelReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LEVEL_BEGIN':
      return { ...state, loading: true, error: null };
    case 'GET_LEVEL_SUCCESS':
      return { ...state, loading: false, levels: Array.isArray(action.data.levels) ? action.data.levels : action.data };
    case 'GET_LEVEL_ERROR':
      return { ...state, loading: false, error: action.error };

    case 'CREATE_LEVEL_BEGIN':
      return { ...state, loadingForm: true, successForm: false, errorForm: null };
    case 'CREATE_LEVEL_SUCCESS':
      return { ...state, loadingForm: false, successForm: true };
    case 'CREATE_LEVEL_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };

    case 'UPDATE_LEVEL_BEGIN':
      return { ...state, loadingForm: true, successForm: false, errorForm: null };
    case 'UPDATE_LEVEL_SUCCESS':
      return { ...state, loadingForm: false, successForm: true };
    case 'UPDATE_LEVEL_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };

    case 'SET_SELECTED_LEVEL':
      return { ...state, selectedLevel: action.level };
    case 'CLEAN_LEVEL_FORM':
      return { ...state, loadingForm: false, successForm: false, errorForm: null, selectedLevel: null };
    default:
      return state;
  }
}
