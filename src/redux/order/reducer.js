
const initialState = {
  orders: [],
  allOrders: [],
  prev: false,
  next: false,
  currentPage: 1,
  loading: false,
  error: null,
  loadingForm: false,
  successForm: false,
  errorForm: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ORDER_DAYS_BEGIN':
      return { ...state, loading: true, error: null };
    case 'GET_ORDER_DAYS_SUCCESS':
      return { ...state, loading: false, orders: action.data.data };
    case 'GET_ORDER_DAYS_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'GET_ORDERS_BEGIN':
      return { ...state, loading: true, error: null };
    case 'GET_ORDERS_SUCCESS':
      return {
        ...state,
        loading: false,
        allOrders: action.data.data,
        prev: action.data.links.prev !== null,
        next: action.data.links.next !== null,
        currentPage: action.data.meta.current_page
      };
    case 'GET_ORDERS_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'ASSIGNED_ORDER_BEGIN':
      return { ...state, loadingForm: true, errorForm: null };
    case 'ASSIGNED_ORDER_SUCCESS':
      return { ...state, loadingForm: false,
        orders: state.orders.map((order) =>
          order.id === action.data.data.id
            ? action.data.data
            : order
        )
      };
    case 'ASSIGNED_ORDER_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };
    case 'INIT_ORDER_BEGIN':
      return { ...state, loadingForm: true, errorForm: null };
    case 'INIT_ORDER_SUCCESS':
      return { ...state, loadingForm: false, successForm: true,
        orders: action.data.data
      };
    case 'INIT_ORDER_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };
    case 'CANCEL_ORDER_BEGIN':
      return { ...state, loadingForm: true, errorForm: null };
    case 'CANCEL_ORDER_SUCCESS':
      return { ...state, loadingForm: false,
        successForm: true,
        allOrders: state.allOrders.map((order) =>
          order.id === action.data.data.id
            ? action.data.data
            : order
        )
      };
    case 'CANCEL_ORDER_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };
    case 'FINISH_ORDER_BEGIN':
      return { ...state, loadingForm: true, errorForm: null };
    case 'FINISH_ORDER_SUCCESS':
      return { ...state, loadingForm: false,
        successForm: true,
        allOrders: state.allOrders.map((order) =>
          order.id === action.data.data.id
            ? action.data.data
            : order
        )
      };
    case 'FINISH_ORDER_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };
    case 'CLEAN_ORDER':
      return { ...state, successForm: false };
    default:
      return state;
  }
}
