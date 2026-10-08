import actions from '../actions';
import { loginUser } from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';
import { setItem } from '../../../utility/localStorageControl';
import Cookies from 'js-cookie';
import { ADMIN, COOKIE_WEB, TOKEN_WEB } from '../../../config/variable/variable';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    postAuth: jest.fn(),
  },
}));

jest.mock('../../../utility/localStorageControl', () => ({
  setItem: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));

describe('loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('stores the token and dispatches success for an admin user', async () => {
    DataService.postAuth.mockResolvedValue({
      data: {
        success: true,
        data: {
          access_token: 'web-token',
          rol: ADMIN,
        },
      },
    });

    const dispatch = jest.fn();

    await loginUser({ email: 'admin@example.com', password: 'secret123' }, true)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.loginBegin());
    expect(DataService.postAuth).toHaveBeenCalledWith(
      '/login',
      { email: 'admin@example.com', password: 'secret123' },
      process.env.REACT_APP_API_AUTH
    );
    expect(setItem).toHaveBeenCalledWith(TOKEN_WEB, 'web-token');
    expect(Cookies.set).toHaveBeenCalledWith(COOKIE_WEB, true);
    expect(dispatch).toHaveBeenLastCalledWith(actions.loginSuccess(true));
  });

  it('dispatches an error when the role is not admin', async () => {
    DataService.postAuth.mockResolvedValue({
      data: {
        success: true,
        data: {
          access_token: 'web-token',
          rol: 'Usuario',
        },
      },
    });

    const dispatch = jest.fn();

    await loginUser({ email: 'user@example.com', password: 'secret123' }, false)(dispatch);

    expect(dispatch).toHaveBeenLastCalledWith(actions.loginError('No tiene permisos para seguir'));
  });
});