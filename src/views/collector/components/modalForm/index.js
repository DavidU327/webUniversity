import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Upload } from 'antd';
import propTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper, PhotoUploadWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import Heading from '../../../../components/heading';

const { Option } = Select;

function ModalFormCollector({ visible, onCancel, title, textButton }) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  console.log(imageUrl, 'imageUrl')
  const handleUploadChange = (info) => {
    if (info?.file) {
      const url = URL.createObjectURL(info.file);
      setImageUrl(url);
    }
  };

  const handleOk = () => {
    const values = form.getFieldsValue();
    console.log(values, 'info usuario')
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
              name="phone"
              label="Teléfono"
              rules={[
                { required: true, message: 'Escribe el teléfono' },
                { pattern: /^[0-9]+$/, message: 'Solo números permitidos' },
              ]}
            >
              <Input placeholder="Teléfono del recolector" />
            </Form.Item>
            <Form.Item name="category" initialValue="C.C" label="Tipo de documento">
              <Select style={{ width: '100%' }}>
                <Option value="C.C">Cedula de ciudadania</Option>
                <Option value="C.E">Cedula de extranjeria</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="identification"
              label="Identificación"
              rules={[
                { required: true, message: 'Escribe el documento' },
                { pattern: /^[0-9]+$/, message: 'Solo números permitidos' },
              ]}
            >
              <Input placeholder="Identificación del recolector" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[
                { required: true, message: 'Escribe el correo' },
              ]}
            >
              <Input placeholder="Correo del recolector" />
            </Form.Item>
            <div className="info">
              <Heading as="h6">Imagen de perfil</Heading>
            </div>
            <PhotoUploadWrapper>
              <img
                src={imageUrl || require('../../../../assets/image/changeImage.jpg')}
                alt="profile"
              />
              <figcaption>
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleUploadChange}
                >
                  <div className="upload-btn">
                    <FeatherIcon icon="camera" size={18} fill="#FFFFFF" />
                  </div>
                </Upload>
              </figcaption>
            </PhotoUploadWrapper>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}

ModalFormCollector.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  textButton: propTypes.string.isRequired,
};

export default ModalFormCollector;
