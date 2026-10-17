import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Login from '../index';

const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  NavLink: ({ children }) => children,
  useHistory: () => ({ push: mockPush }),
}));

jest.mock('../style', () => ({
  AuthWrapper: ({ children }) => children,
}));

jest.mock('../../../components/heading', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

jest.mock('../../../components/checkbox', () => ({
  Checkbox: ({ children, onChange, checked }) => (
    <input
      type="checkbox"
      data-testid="remember-checkbox"
      checked={checked}
      onChange={onChange}
    />
  ),
}));

jest.mock('../../../utility/notification', () => ({
  openNotification: jest.fn(),
}));

jest.mock('../../../redux/authentication/actionCreator', () => ({
  loginUser: jest.fn(() => ({ type: 'LOGIN_USER' })),
  cleanLogin: jest.fn(() => ({ type: 'CLEAR_LOGIN_ERROR' })),
}));

jest.mock('antd', () => {
  const React = require('react');

  const Form = ({ children, onFinish }) => (
    <form
      data-testid="login-form"
      onSubmit={e => {
        e.preventDefault();
        if (onFinish) {
          onFinish({ email: 'admin@example.com', password: 'secret123' });
        }
      }}
    >
      {children}
    </form>
  );

  Form.useForm = () => [{ setFieldsValue: jest.fn() }];
  Form.Item = ({ children }) => <div>{children}</div>;

  return {
    Button: ({ children, ...props }) => <button {...props}>{children}</button>,
    Form,
    Input: Object.assign(({ ...props }) => <input {...props} />, {
      Password: ({ ...props }) => <input {...props} />,
    }),
  };
});

describe('Login view', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to the admin dashboard when login is successful', () => {
    const { useSelector } = require('react-redux');
    useSelector.mockImplementation(selector =>
      selector({
        auth: {
          loading: false,
          login: true,
          error: null,
        },
      })
    );

    render(<Login />);

    return waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  it('dispatches cleanLogin when the auth state has an error', () => {
    const { useSelector } = require('react-redux');
    const { openNotification } = require('../../../utility/notification');
    const { cleanLogin } = require('../../../redux/authentication/actionCreator');

    useSelector.mockImplementation(selector =>
      selector({
        auth: {
          loading: false,
          login: false,
          error: 'Credenciales inválidas',
        },
      })
    );

    render(<Login />);

    return waitFor(() => {
      expect(openNotification).toHaveBeenCalledWith(
        'error',
        'Ocurrio un error',
        'Credenciales inválidas'
      );
      expect(mockDispatch).toHaveBeenCalledWith(cleanLogin());
    });
  });

  it('toggles remember checkbox and submits login credentials', () => {
    const { useSelector } = require('react-redux');
    const { loginUser } = require('../../../redux/authentication/actionCreator');

    useSelector.mockImplementation(selector =>
      selector({
        auth: {
          loading: false,
          login: false,
          error: null,
        },
      })
    );

    const { getByTestId } = render(<Login />);

    fireEvent.click(getByTestId('remember-checkbox'));
    fireEvent.submit(getByTestId('login-form'));

    expect(loginUser).toHaveBeenCalledWith(
      { email: 'admin@example.com', password: 'secret123' },
      true
    );
    expect(mockDispatch).toHaveBeenCalled();
  });
});