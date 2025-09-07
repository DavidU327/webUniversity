import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../components/heading';
import { Checkbox } from '../../components/checkbox';
import { loginUser, cleanLogin } from '../../redux/authentication/actionCreator';
import { openNotification } from '../../utility/notification';

function Login(){

  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, login, error } = useSelector((state) => state.auth);

  const [check, setCheck] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = useCallback((values) => {
    dispatch(loginUser(values, check));
  }, [dispatch, check]);

  const onChange = () => {
    setCheck(!check);
  };

  useEffect(() => {
    if(login){
      openNotification('success', 'Bienvenido', 'Has ingresado correctamente');
      history.push('/admin/dashboard');
    }
  }, [login]);

  useEffect(() => {
    if(error !== null){
      openNotification('error', 'Ocurrio un error', error);
      dispatch(cleanLogin());
    }
  }, [error]);

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login"
              form={form}
              onFinish={handleSubmit}
              layout="vertical">
          <Heading as="h3" className="mt-30">
            Ingresar
          </Heading>
          <Form.Item
            name="email"
            rules={[
              { message: 'Colocar un correo valido!', required: true },
              { type: 'email', message: 'Coloca un correo válido' },
            ]}
            label="Correo electrónico"
          >
            <Input placeholder="test@gmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: 'Escribe la contraseña' },
              { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
            ]}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange} checked={check}>
              Mantenerme conectado
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              ¿Recuperar contraseña?
            </NavLink>
          </div>
          <Form.Item>
            <Button
              loading={loading}
              className="btn-signin" htmlType="submit" type="primary" size="large">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  )
}

export default Login
