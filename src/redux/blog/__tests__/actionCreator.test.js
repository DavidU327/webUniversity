import actions from '../actions';
import { getBlogs, createBlog, updatedBlog, changeStateBlog } from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    get: jest.fn(),
    postFormData: jest.fn(),
    patch: jest.fn(),
  },
}));

describe('blog actionCreator (Sprint 5 - HU-29, HU-31)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('HU-29: dispatches begin and success when administrator creates a blog', async () => {
    const blogParams = {
      title: 'Guía de reciclaje en casa',
      description: 'Cómo clasificar residuos en el hogar.',
      url: 'https://greencity.test/blog-reciclaje',
      imageUrl: { file: new Blob(['fake-image'], { type: 'image/png' }) },
    };

    const response = {
      data: {
        blog: {
          id: 1,
          title: 'Guía de reciclaje en casa',
          description: 'Cómo clasificar residuos en el hogar.',
          url: 'https://greencity.test/blog-reciclaje',
          is_active: true,
        },
      },
      message: 'Se ha creado el blog correctamente',
    };

    DataService.postFormData.mockResolvedValue(response);
    const dispatch = jest.fn();

    await createBlog(blogParams)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.createBlogBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.createBlogSuccess({
        data: response.data.blog,
        message: response.message,
      })
    );
    expect(DataService.postFormData).toHaveBeenCalledWith(
      '/blogs_web',
      expect.any(FormData),
      process.env.REACT_APP_API_BLOG
    );
  });

  it('HU-31: dispatches begin and success when administrator updates a blog', async () => {
    const updateParams = {
      title: 'Guía actualizada de reciclaje',
      description: 'Descripción actualizada del blog.',
      url: 'https://greencity.test/blog-actualizado',
      imageUrl: null,
    };

    const response = {
      data: {
        blog: {
          id: 4,
          title: 'Guía actualizada de reciclaje',
          description: 'Descripción actualizada del blog.',
          url: 'https://greencity.test/blog-actualizado',
          is_active: true,
        },
        message: 'Se ha actualizado el blog correctamente',
      },
    };

    DataService.postFormData.mockResolvedValue(response);
    const dispatch = jest.fn();

    await updatedBlog(updateParams, 4)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.updateBlogBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.updateBlogSuccess({
        id: 4,
        data: response.data.blog,
        message: response.data.message,
      })
    );
    expect(DataService.postFormData).toHaveBeenCalledWith(
      '4/blogs_web',
      expect.any(FormData),
      process.env.REACT_APP_API_BLOG
    );
  });

  it('HU-31: dispatches begin and success when administrator changes blog state', async () => {
    const response = {
      data: {
        blog: {
          id: 4,
          title: 'Guía actualizada de reciclaje',
          is_active: false,
        },
        message: 'Cambio de estado correctamente',
      },
    };

    DataService.patch.mockResolvedValue(response);
    const dispatch = jest.fn();

    await changeStateBlog(4)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.changeStateBlogBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.changeStateBlogSuccess({
        id: 4,
        data: response.data.blog,
        message: response.data.message,
      })
    );
    expect(DataService.patch).toHaveBeenCalledWith(
      '4/change_state_blogs',
      {},
      process.env.REACT_APP_API_BLOG
    );
  });

  it('fetches all blogs for backoffice table', async () => {
    const response = {
      data: {
        data: [{ id: 1, title: 'Guía de reciclaje en casa' }],
      },
    };

    DataService.get.mockResolvedValue(response);
    const dispatch = jest.fn();

    await getBlogs()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getBlogsBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getBlogsSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith('/blogs_web', process.env.REACT_APP_API_BLOG);
  });
});

