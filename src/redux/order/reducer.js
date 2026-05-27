
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ORDER_DAYS_BEGIN':
      return { ...state, loading: true, error: null };
    case 'GET_ORDER_DAYS_SUCCESS':
      return { ...state, loading: false, orders: action.data.data };
    case 'GET_ORDER_DAYS_ERROR':
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}
