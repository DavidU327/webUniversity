import React from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';

function ModalCancelOrder({ visible, onCancel, order, loading, confirmCancelOrder }) {

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type="primary"
      title="Cancelar Órden"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button size="default" type="error" onClick={confirmCancelOrder} loading={loading}>
          Cancelar
        </Button>
      ]}
    >
      <div>
        <span>Se va a cancelar la Órden {order.id}, esta seguro, esta acción no se puede reversar</span>
      </div>
    </Modal>
  );
}

ModalCancelOrder.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  order: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  confirmCancelOrder: propTypes.func.isRequired,
};

export default ModalCancelOrder;
