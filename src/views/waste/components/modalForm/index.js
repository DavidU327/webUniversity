import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { BasicFormWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';


function ModalFormWaste({ visible, onCancel, title, textButton }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    const values = form.getFieldsValue();
    console.log(values, 'info residuo')
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  return (
    <Modal
      type={state.modalType}
      title={title}
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={handleOk}>
            {textButton}
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="recollector" onFinish={handleOk}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                { required: true, message: 'Escribe el nombre' },
              ]}
            >
              <Input placeholder="Nombre del recolector" />
            </Form.Item>
            <Form.Item
              name="pints"
              label="Puntos por kilo"
              rules={[
                { required: true, message: 'Escribe los puntos' },
                { pattern: /^[0-9]+$/, message: 'Solo números permitidos' },
              ]}
            >
              <Input placeholder="Puntos por kilo" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}

ModalFormWaste.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  textButton: propTypes.string.isRequired,
};

export default ModalFormWaste;
