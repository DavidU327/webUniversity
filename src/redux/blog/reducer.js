
const initialState = {
  blogs: [],
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

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_BLOGS_BEGIN':
      return { ...state, loading: true, error: null };
    case 'GET_BLOGS_SUCCESS':
      return {
        ...state,
        blogs: action.data.data,
        prev: action.data.links.prev !== null,
        next: action.data.links.next !== null,
        currentPage: action.data.meta.current_page,
        loading: false
      };
    case 'GET_BLOGS_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'CREATE_BLOG_BEGIN':
      return { ...state, loadingForm: true, errorForm: null };
    case 'CREATE_BLOG_SUCCESS':
      return {
        ...state,
        loadingForm: false,
        successForm: true,
        message: action.data.message,
        blogs: [action.data.data, ...state.blogs]
      };
    case 'CREATE_BLOG_ERROR':
      return { ...state, loadingForm: false, errorForm: action.error };
    case 'CLEAN_BLOG_FORM':
      return { ...state, loadingForm: false, successForm: false, errorForm: null };
    default:
      return state;
  }
}
