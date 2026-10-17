import actions from '../actions';
import {
  loginUser,
  cleanLogin,
  handleChangeScreen,
  sendEmail,
  validateCode,
  changePassword,
} from '../actionCreator';
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

describe('loginUser and authentication helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('stores the token and dispatches success for an admin user with and without remember', async () => {
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

    Cookies.set.mockClear();
    await loginUser({ email: 'admin@example.com', password: 'secret123' }, false)(dispatch);
    expect(Cookies.set).not.toHaveBeenCalled();
  });

  it('dispatches an error when the role is not admin or login fails', async () => {
    DataService.postAuth.mockResolvedValueOnce({
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

    DataService.postAuth.mockResolvedValueOnce({
      data: {
        success: false,
      },
    });
    await loginUser({ email: 'user@example.com', password: 'bad' }, false)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.loginError('Error al iniciar sesión'));

    DataService.postAuth.mockRejectedValueOnce({});
    await loginUser({ email: 'user@example.com', password: 'bad' }, false)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.loginError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('cleans login form and changes screen', async () => {
    const dispatch = jest.fn();
    await cleanLogin()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(actions.clearLoginForm());

    await handleChangeScreen(2)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(actions.changeScreen(2));
  });
});

describe('password recovery flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches success and handles errors when sending the password recovery email', async () => {
    DataService.postAuth.mockResolvedValueOnce({
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
      actions.sendEmailSuccess({
        email: 'admin@example.com',
        message: 'Código enviado correctamente',
      })
    );

    DataService.postAuth.mockResolvedValueOnce({ data: { success: false } });
    await sendEmail({ email: 'admin@example.com' })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.sendEmailError('Error al enviar código'));

    DataService.postAuth.mockRejectedValueOnce({});
    await sendEmail({ email: 'admin@example.com' })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.sendEmailError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('dispatches success and handles errors when validating the recovery code', async () => {
    DataService.postAuth.mockResolvedValueOnce({
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

    DataService.postAuth.mockResolvedValueOnce({ data: { success: false } });
    await validateCode({ code: '000000' })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.validateCodeError('Error al validar token'));

    DataService.postAuth.mockRejectedValueOnce({});
    await validateCode({ code: '000000' })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.validateCodeError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('dispatches success and handles errors when the password is changed', async () => {
    DataService.postAuth.mockResolvedValueOnce({
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

    DataService.postAuth.mockResolvedValueOnce({ data: { success: false } });
    await changePassword({})(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.changePasswordError('Error al cambiar contraseña')
    );

    DataService.postAuth.mockRejectedValueOnce({});
    await changePassword({})(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.changePasswordError('Error de servidor. Intenta de nuevo.')
    );
  });
});