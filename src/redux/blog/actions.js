const actions = {
  getBlogsBegin: () => ({ type: 'GET_BLOGS_BEGIN' }),
  getBlogsSuccess: (data) => ({ type: 'GET_BLOGS_SUCCESS', data }),
  getBlogsError: (error) => ({ type: 'GET_BLOGS_ERROR', error }),

  createBlogBegin: () => ({ type: 'CREATE_BLOG_BEGIN' }),
  createBlogSuccess: (data) => ({ type: 'CREATE_BLOG_SUCCESS', data }),
  createBlogError: (error) => ({ type: 'CREATE_BLOG_ERROR', error }),

  updateBlogBegin: () => ({ type: 'UPDATE_BLOG_BEGIN' }),
  updateBlogSuccess: (data) => ({ type: 'UPDATE_BLOG_SUCCESS', data }),
  updateBlogError: (error) => ({ type: 'UPDATE_BLOG_ERROR', error }),


  cleanBlogForm: () => ({ type: 'CLEAN_BLOG_FORM' }),
};

export default actions;
