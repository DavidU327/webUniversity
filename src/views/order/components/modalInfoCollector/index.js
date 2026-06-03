import React from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';

function ModalInfoCollector({ visible, onCancel, collector }) {

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type="primary"
      title="Información del recolector"
      visible={visible}
      onCancel={handleCancel}
      footer={[]}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <img
            style={{ width: '80px', height: '80px', borderRadius: '10px' }}
            src={collector?.photo}
            alt="user"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span>Nombre: {collector?.name}</span>
          <span>Teléfono: {collector?.phone}</span>
          <span>Correo: {collector?.email}</span>
        </div>
      </div>
    </Modal>
  );
}

ModalInfoCollector.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  collector: propTypes.object.isRequired,
};

export default ModalInfoCollector;
