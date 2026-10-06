import { Button, Form, Input } from 'antd';
import React from 'react';
import propTypes from 'prop-types';

export const ResetPassword = ({ loading }) => {
  return (
    <>
      <div className="mb-20 mt-20">
        Escribe la nueva contraseña
      </div>
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
      <Form.Item
        name="password_confirmation"
        label="Confirmar Contraseña"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Confirma la contraseña' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Las contraseñas no coinciden'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Contraseña" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          className="btn-signin" htmlType="submit" type="primary" size="large">
          Cambiar Contraseña
        </Button>
      </Form.Item>
    </>
  )
};

ResetPassword.propTypes = {
  loading: propTypes.bool.isRequired,
};
