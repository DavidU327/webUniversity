import React, { useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../components/heading';
import { Checkbox } from '../../components/checkbox';

function Login(){

  const history = useHistory();

  const [form] = Form.useForm();

  const handleSubmit = useCallback(() => {
    history.push('/admin');
  }, [history]);

  const onChange = () => {

  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3" className="mt-30">
            Ingresar
          </Heading>
          <Form.Item
            name="email"
            rules={[{ message: 'Colocar un correo valido!', required: true }]}
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
            <Checkbox onChange={onChange} checked={false}>
              Mantenerme conectado
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              ¿Recuperar contraseña?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  )
}

export default Login
