import React, { useState, useEffect } from 'react';
import { Form, Input, notification } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { BasicFormWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import { createWaste, updateWaste, cleanWasteFormAction } from '../../../../redux/waste/actionCreator';

function ModalFormWaste({ visible, onCancel, title, textButton }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { loadingForm, successForm, errorForm, selectedWaste } = useSelector(
    (state) => state.waste
  );

  const [modalState, setModalState] = useState({
    visible,
    modalType: 'primary',
  });

  // Sincronizar visibilidad
  useEffect(() => {
    setModalState((prev) => ({ ...prev, visible }));
  }, [visible]);

  // Precargar datos al editar
  useEffect(() => {
    if (visible && selectedWaste) {
      form.setFieldsValue({
        name: selectedWaste.name,
        points_per_kilo: selectedWaste.points_per_kilo,
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, selectedWaste, form]);

  // Notificaciones al éxito / error
  useEffect(() => {
    if (successForm && visible) {
      notification.success({
        message: selectedWaste ? 'Residuo actualizado' : 'Residuo creado',
        description: selectedWaste
          ? 'El residuo fue actualizado exitosamente.'
          : 'El residuo fue creado exitosamente.',
      });
      dispatch(cleanWasteFormAction());
      onCancel();
    }
    if (errorForm && visible) {
      notification.error({
        message: 'Error',
        description: errorForm,
      });
    }
  }, [successForm, errorForm]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedWaste) {
        dispatch(updateWaste(selectedWaste.id, values));
      } else {
        dispatch(createWaste(values));
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(cleanWasteFormAction());
    onCancel();
  };

  return (
    <Modal
      type={modalState.modalType}
      title={title}
      visible={modalState.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            onClick={handleOk}
            loading={loadingForm}
          >
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
          <Form form={form} name="waste" layout="vertical">
            <Form.Item
              name="name"
              label="Nombre del residuo"
              rules={[{ required: true, message: 'Escribe el nombre del residuo' }]}
            >
              <Input placeholder="Nombre del residuo" />
            </Form.Item>
            <Form.Item
              name="points_per_kilo"
              label="Puntos por kilo"
              rules={[
                { required: true, message: 'Escribe los puntos por kilo' },
                { pattern: /^\d+(\.\d+)?$/, message: 'Solo números permitidos' },
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
