import React from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';

function ModalInfoUser({ visible, onCancel, user }) {

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type="primary"
      title="Información del usuario"
      visible={visible}
      onCancel={handleCancel}
      footer={[]}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <img
            style={{ width: '80px', height: '80px', borderRadius: '10px' }}
            src={user?.photo}
            alt="user"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span>Nombre: {user?.name}</span>
          <span>Teléfono: {user?.phone}</span>
        </div>
      </div>
    </Modal>
  );
}

ModalInfoUser.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
};

export default ModalInfoUser;
