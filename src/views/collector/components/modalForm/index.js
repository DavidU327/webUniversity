import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Form, Input, Select, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BasicFormWrapper, PhotoUploadWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import { createRecollector } from '../../../../redux/recollector/actionCreator';

const { Option } = Select;

function ModalFormCollector({ visible, onCancel, title, textButton }) {
  const dispatch = useDispatch();

  const {typeIdentifications} = useSelector((state) => state.typeIdentification);
  const {loadingForm} = useSelector((state) => state.recollector);

  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [documentIdentification, setDocumentIdentification] = useState(null);
  const [documentDriving, setDocumentDriving] = useState(null);

  const handleUploadChange = (info) => {
    if (info?.file) {
      const url = URL.createObjectURL(info.file);
      setImageUrl({
        url,
        file: info.file
      });
    }
  };

  const handleUploadDocument = (info, type) => {
    if (info?.file?.status === 'removed') return;

    if (info?.file) {
      const file = info.file.originFileObj ?? info.file;
      const url = URL.createObjectURL(file);
      if (type === 'document_identification') {
        setDocumentIdentification({ url, file });
      }
      if (type === 'document_driving_license') {
        setDocumentDriving({ url, file });
      }
    }
  };

  const removeDocument = (type) => {
    if (type === 'document_identification') {
      setDocumentIdentification(null);
    }
    if (type === 'document_driving_license') {
      setDocumentDriving(null);
    }
  };

  const handleOk = () => {
    const values = form.getFieldsValue();
    dispatch(createRecollector({...values, imageUrl, documentIdentification, documentDriving}));
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
          <Button size="default" type="primary" onClick={() => form.submit()} loading={loadingForm}  >
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
            {typeIdentifications.length > 0 && (
              <Form.Item name="type_identification" initialValue={typeIdentifications[0].id} label="Tipo de documento">
                <Select style={{ width: '100%' }}>
                  {typeIdentifications.map((identification) => (
                    <Option value={identification.id}>{identification.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            )}
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
                { type: 'email', message: 'Coloca un correo válido' },
              ]}
            >
              <Input placeholder="Correo del recolector" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Imagen de Perfil"
              rules={[
                { required: true, message: 'Suba una imagen' },
              ]}
            >
              <PhotoUploadWrapper>
                <img
                  src={imageUrl?.url || require('../../../../assets/image/changeImage.jpg')}
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
            </Form.Item>
            <Form.Item
              name="document_identification"
              label="Documento de Identidad"
            >
              <Upload
                beforeUpload={() => false}
                onRemove={() => removeDocument('document_identification')}
                className="sDash_upload-basic"
                onChange={(info) => handleUploadDocument(info, 'document_identification')}
              >
                <span className="sDash_upload-text">Subir Documento de identidad</span>
                <Link to="#" className="sDash_upload-browse">
                  Buscar
                </Link>
              </Upload>
            </Form.Item>
            <Form.Item
              name="document_driving_license"
              label="Licencia de conducción"
            >
              <Upload
                beforeUpload={() => false}
                onRemove={() => removeDocument('document_driving_license')}
                className="sDash_upload-basic"
                onChange={(info) => handleUploadDocument(info, 'document_driving_license')}
              >
                <span className="sDash_upload-text">Subir Licencia de conducción</span>
                <Link to="#" className="sDash_upload-browse">
                  Buscar
                </Link>
              </Upload>
            </Form.Item>
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
