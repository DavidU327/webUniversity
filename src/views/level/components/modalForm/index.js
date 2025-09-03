import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { BasicFormWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';


function ModalFormLevel({ visible, onCancel, title, textButton }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    const values = form.getFieldsValue();
    console.log(values, 'info niveles')
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
          <Form form={form} name="level" onFinish={handleOk}>
            <Form.Item
              name="level"
              label="Nivel"
              rules={[
                { required: true, message: 'Escribe el nivel' },
              ]}
            >
              <Input placeholder="Nivel" />
            </Form.Item>
            <Form.Item
              name="point_min"
              label="Puntos mínimos"
              rules={[
                { required: true, message: 'Escribe los puntos mínimos' },
                { pattern: /^[0-9]+$/, message: 'Solo números permitidos' },
              ]}
            >
              <Input placeholder="Puntos mínimos" />
            </Form.Item>
            <Form.Item
              name="point_max"
              label="Puntos máximos"
              rules={[
                { required: true, message: 'Escribe los puntos máximos' },
                { pattern: /^[0-9]+$/, message: 'Solo números permitidos' },
              ]}
            >
              <Input placeholder="Puntos máximos" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}

ModalFormLevel.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  textButton: propTypes.string.isRequired,
};

export default ModalFormLevel;
