import { Button, Form, Input } from 'antd';
import React from 'react';
import propTypes from 'prop-types';

export const ValidateToken = ({ loading }) => {
  return (
    <>
      <div className="mb-20 mt-20">
        Valida el token enviado al correo
      </div>
      <Form.Item
        name="code"
        rules={[
          { message: 'Token Requerido', required: true },
        ]}
        label="Token"
      >
        <Input placeholder="123456" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          className="btn-signin" htmlType="submit" type="primary" size="large">
          Validar token
        </Button>
      </Form.Item>
    </>
  )
};

ValidateToken.propTypes = {
  loading: propTypes.bool.isRequired,
};
