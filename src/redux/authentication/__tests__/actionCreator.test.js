import actions from '../actions';
import { loginUser, sendEmail, validateCode, changePassword } from '../actionCreator';
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

describe('password recovery flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches success when sending the password recovery email', async () => {
    DataService.postAuth.mockResolvedValue({
      data: {
        success: true,
        message: 'Código enviado correctamente',
      },
    });

    const dispatch = jest.fn();

    await sendEmail({ email: 'admin@example.com' })(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.sendEmailBegin());
    expect(DataService.postAuth).toHaveBeenCalledWith(
      '/send_code',
      { email: 'admin@example.com' },
      process.env.REACT_APP_API_AUTH
    );
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.sendEmailSuccess({ email: 'admin@example.com', message: 'Código enviado correctamente' })
    );
  });

  it('dispatches success when validating the recovery code', async () => {
    DataService.postAuth.mockResolvedValue({
      data: {
        success: true,
        message: 'Código válido',
      },
    });

    const dispatch = jest.fn();

    await validateCode({ code: '123456' })(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.validateCodeBegin());
    expect(DataService.postAuth).toHaveBeenCalledWith(
      '/validate_code',
      { code: '123456' },
      process.env.REACT_APP_API_AUTH
    );
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.validateCodeSuccess({ code: '123456', message: 'Código válido' })
    );
  });

  it('dispatches success when the password is changed', async () => {
    DataService.postAuth.mockResolvedValue({
      data: {
        success: true,
        message: 'Contraseña actualizada',
      },
    });

    const dispatch = jest.fn();

    await changePassword({
      email: 'admin@example.com',
      password: 'NuevaPass123',
      password_confirmation: 'NuevaPass123',
    })(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.changePasswordBegin());
    expect(DataService.postAuth).toHaveBeenCalledWith(
      '/change_password',
      {
        email: 'admin@example.com',
        password: 'NuevaPass123',
        password_confirmation: 'NuevaPass123',
      },
      process.env.REACT_APP_API_AUTH
    );
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.changePasswordSuccess({ message: 'Contraseña actualizada' })
    );
  });
});