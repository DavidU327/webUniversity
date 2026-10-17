import actions from '../actions';
import {
  getBlogs,
  createBlog,
  updatedBlog,
  changeStateBlog,
  cleanBlogFormAction,
} from '../actionCreator';
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

  it('HU-29: dispatches begin and success when administrator creates a blog and handles errors', async () => {
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

    DataService.postFormData.mockResolvedValueOnce(response);
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

    DataService.postFormData.mockResolvedValueOnce({ data: {} });
    await createBlog(blogParams)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.createBlogError('Error al crear blog'));

    DataService.postFormData.mockRejectedValueOnce({});
    await createBlog(blogParams)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.createBlogError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('HU-31: dispatches begin and success when administrator updates a blog with or without image and handles errors', async () => {
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

    DataService.postFormData.mockResolvedValueOnce(response);
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

    // With image
    DataService.postFormData.mockResolvedValueOnce({ data: {} });
    await updatedBlog(
      { ...updateParams, imageUrl: { file: new Blob(['img']) } },
      4
    )(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.updateBlogError('Error al actualizar blog')
    );

    DataService.postFormData.mockRejectedValueOnce({});
    await updatedBlog(updateParams, 4)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.updateBlogError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('HU-31: dispatches begin and success when administrator changes blog state and handles errors', async () => {
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

    DataService.patch.mockResolvedValueOnce(response);
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

    DataService.patch.mockResolvedValueOnce({ data: {} });
    await changeStateBlog(4)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.changeStateBlogError('Error al cambiar estado blog')
    );

    DataService.patch.mockRejectedValueOnce({});
    await changeStateBlog(4)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.changeStateBlogError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('fetches all blogs for backoffice table, handles errors, and cleans form', async () => {
    const response = {
      data: {
        data: [{ id: 1, title: 'Guía de reciclaje en casa' }],
      },
    };

    DataService.get.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await getBlogs()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getBlogsBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getBlogsSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith('/blogs_web', process.env.REACT_APP_API_BLOG);

    DataService.get.mockResolvedValueOnce({});
    await getBlogs()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.getBlogsError('Error al obtener los blogs'));

    DataService.get.mockRejectedValueOnce({});
    await getBlogs()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getBlogsError('Error de servidor. Intenta de nuevo.')
    );

    cleanBlogFormAction()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.cleanBlogForm());
  });
});
