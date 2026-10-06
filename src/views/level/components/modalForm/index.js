
import React, { useState, useEffect } from 'react';
import { Form, Input, notification } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { BasicFormWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import { createLevel, updateLevel, cleanLevelFormAction } from '../../../../redux/level/actionCreator';

function ModalFormLevel({ visible, onCancel, title, textButton }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { loadingForm, successForm, errorForm, selectedLevel } = useSelector(
    (state) => state.level
  );

  const [modalState, setModalState] = useState({
    visible,
    modalType: 'primary',
  });

  // Sincronizar visibilidad
  useEffect(() => {
    setModalState((prev) => ({ ...prev, visible }));
  }, [visible]);

  // Precargar datos al editar (mapeo de campos de API a formulario)
  useEffect(() => {
    if (visible && selectedLevel) {
      form.setFieldsValue({
        level: selectedLevel.name || selectedLevel.level,
        point_min: selectedLevel.min_point,
        point_max: selectedLevel.max_point,
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, selectedLevel, form]);

  // Notificaciones al éxito / error
  useEffect(() => {
    if (successForm && visible) {
      notification.success({
        message: selectedLevel ? 'Nivel actualizado' : 'Nivel creado',
        description: selectedLevel
          ? 'El nivel fue actualizado exitosamente.'
          : 'El nivel fue creado exitosamente.',
      });
      dispatch(cleanLevelFormAction());
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
      // Mapear los campos del formulario a los nombres esperados por la API
      const payload = {
        name: values.level,
        min_point: values.point_min,
        max_point: values.point_max,
      };
      if (selectedLevel) {
        dispatch(updateLevel(selectedLevel.id, payload));
      } else {
        dispatch(createLevel(payload));
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(cleanLevelFormAction());
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
          <Form form={form} name="level" layout="vertical">
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
                { pattern: /^\d+$/, message: 'Solo números permitidos' },
              ]}
            >
              <Input placeholder="Puntos mínimos" />
            </Form.Item>
            <Form.Item
              name="point_max"
              label="Puntos máximos"
              rules={[
                { required: true, message: 'Escribe los puntos máximos' },
                { pattern: /^\d+$/, message: 'Solo números permitidos' },
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
