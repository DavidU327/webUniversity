import actions from './actions';

const {
  GET_WASTE_BEGIN,
  GET_WASTE_SUCCESS,
  GET_WASTE_ERROR,
  CREATE_WASTE_BEGIN,
  CREATE_WASTE_SUCCESS,
  CREATE_WASTE_ERROR,
  UPDATE_WASTE_BEGIN,
  UPDATE_WASTE_SUCCESS,
  UPDATE_WASTE_ERROR,
  TOGGLE_STATUS_WASTE_BEGIN,
  TOGGLE_STATUS_WASTE_SUCCESS,
  TOGGLE_STATUS_WASTE_ERROR,
  DELETE_WASTE_BEGIN,
  DELETE_WASTE_SUCCESS,
  DELETE_WASTE_ERROR,
  SET_SELECTED_WASTE,
  CLEAN_WASTE_FORM,
} = actions;

const initState = {
  loading: false,
  wastes: [],
  error: null,
  loadingForm: false,
  successForm: false,
  errorForm: null,
  loadingToggle: false,
  loadingDelete: false,
  selectedWaste: null,
  message: '',
};

const WasteReducer = (state = initState, action) => {
  const { type, data, err, id, waste } = action;

  switch (type) {
    // --- GET ---
    case GET_WASTE_BEGIN:
      return { ...state, loading: true, error: null };
    case GET_WASTE_SUCCESS:
      return { ...state, loading: false, wastes: data.data || data };
    case GET_WASTE_ERROR:
      return { ...state, loading: false, error: err };

    // --- CREATE ---
    case CREATE_WASTE_BEGIN:
      return { ...state, loadingForm: true, successForm: false, errorForm: null };
    case CREATE_WASTE_SUCCESS:
      return { ...state, loadingForm: false, successForm: true, message: 'Residuo creado exitosamente' };
    case CREATE_WASTE_ERROR:
      return { ...state, loadingForm: false, errorForm: err };

    // --- UPDATE ---
    case UPDATE_WASTE_BEGIN:
      return { ...state, loadingForm: true, successForm: false, errorForm: null };
    case UPDATE_WASTE_SUCCESS:
      return { ...state, loadingForm: false, successForm: true, message: 'Residuo actualizado exitosamente' };
    case UPDATE_WASTE_ERROR:
      return { ...state, loadingForm: false, errorForm: err };

    // --- TOGGLE STATUS ---
    case TOGGLE_STATUS_WASTE_BEGIN:
      return { ...state, loadingToggle: true };
    case TOGGLE_STATUS_WASTE_SUCCESS:
      return { ...state, loadingToggle: false };
    case TOGGLE_STATUS_WASTE_ERROR:
      return { ...state, loadingToggle: false, error: err };

    // --- DELETE ---
    case DELETE_WASTE_BEGIN:
      return { ...state, loadingDelete: true };
    case DELETE_WASTE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        wastes: state.wastes.filter((w) => w.id !== id),
      };
    case DELETE_WASTE_ERROR:
      return { ...state, loadingDelete: false, error: err };

    // --- MISC ---
    case SET_SELECTED_WASTE:
      return { ...state, selectedWaste: waste };
    case CLEAN_WASTE_FORM:
      return { ...state, successForm: false, errorForm: null, selectedWaste: null, message: '' };

    default:
      return state;
  }
};

export default WasteReducer;
