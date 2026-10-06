import { Button, Form, Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

export const SendEmail = ({ loading }) => {
  return (
    <>
      <div className="mb-20 mt-20">
        Escribe el correo al cual se le enviara la contraseña
      </div>
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
      <Form.Item>
        <Button
          loading={loading}
          className="btn-signin" htmlType="submit" type="primary" size="large">
          Enviar correo
        </Button>
      </Form.Item>
    </>
  )
};

SendEmail.propTypes = {
  loading: PropTypes.bool.isRequired,
};
