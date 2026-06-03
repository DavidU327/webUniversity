import React from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';

function ModalInfoWaste({ visible, onCancel, wastes }) {

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type="primary"
      title="Lista de Residuos"
      visible={visible}
      onCancel={handleCancel}
      footer={[]}
    >
      {wastes.map((waste, index) => (
        <div key={index}>• {waste.name || 'Sin tipo'} - {waste.weight} kg</div>
      ))}
    </Modal>
  );
}

ModalInfoWaste.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  wastes: propTypes.array.isRequired,
};

export default ModalInfoWaste;
