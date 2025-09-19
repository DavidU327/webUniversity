import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BasicFormWrapper, ErrorText } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import { uploadDocument } from '../../../../redux/recollector/actionCreator';

function ModalUploadCollector({ visible, onCancel, id }) {
  const dispatch = useDispatch();

  const {loadingForm} = useSelector((state) => state.recollector);

  const [document, setDocument] = useState(null);
  const [error, setError] = useState(false);

  const handleUploadDocument = (info) => {
    if (info?.file?.status === 'removed') return;
    if (info?.file) {
      const file = info.file.originFileObj ?? info.file;
      const url = URL.createObjectURL(file);
      setDocument({ url, file });
    }
  };

  const removeDocument = () => {
    setDocument(null);
  };

  const handleOk = () => {
    setError(false);
    if(document === null){
      setError(true);
      return;
    }
    const values = {
      document,
      type: visible,
      id,
    };
    dispatch(uploadDocument(values));
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
      title='Subir documento'
      visible
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" onClick={handleOk} loading={loadingForm}>
            Subir documento
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
          <Upload
            beforeUpload={() => false}
            onRemove={() => removeDocument(visible)}
            className="sDash_upload-basic"
            onChange={(info) => handleUploadDocument(info, visible)}
          >
            {visible === 'document_identification' && (
              <span className="sDash_upload-text">Subir Documento de identificación</span>
            )}
            {visible === 'document_driving_license' && (
              <span className="sDash_upload-text">Subir Licencia de conducción</span>
            )}
            <Link to="#" className="sDash_upload-browse">
              Buscar
            </Link>
          </Upload>
        </BasicFormWrapper>
        {error && (
          <ErrorText>Debe seleccionar un documento</ErrorText>
        )}
      </div>
    </Modal>
  );
}

ModalUploadCollector.propTypes = {
  visible: propTypes.string.isRequired,
  onCancel: propTypes.func.isRequired,
  id: propTypes.number.isRequired,
};

export default ModalUploadCollector;
