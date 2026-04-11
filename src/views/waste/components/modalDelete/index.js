import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';


function ModalDeleteWaste({ visible, onCancel, onDelete }) {
  const { selectedWaste, loadingDelete } = useSelector((state) => state.waste);

  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    if (selectedWaste) {
      onDelete(selectedWaste.id);
    }
  };

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState((prev) => ({ ...prev, visible }));
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  return (
    <Modal
      type={state.modalType}
      title="Eliminar residuo"
      visible={state.visible}
      footer={[
        <div key="1">
          <Button
            size="default"
            type="danger"
            key="submit"
            onClick={handleDelete}
            loading={loadingDelete}
          >
            Eliminar residuo
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <span>
        ¿De verdad deseas eliminar el residuo{' '}
        <strong>{selectedWaste?.name}</strong>? Esto no se puede reversar.
      </span>
    </Modal>
  );
}

ModalDeleteWaste.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
};

export default ModalDeleteWaste;
