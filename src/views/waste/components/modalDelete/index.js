import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';


function ModalDeleteWaste({ visible, onCancel, deleteWaste }) {

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
      title="Eliminar residuo"
      visible={state.visible}
      footer={[
        <div key="1" >
          <Button size="default" type="danger" key="submit" onClick={deleteWaste}>
            Eliminar residuo
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <span>De verdad desea eliminar el residuo, esto no se puede reversar</span>
    </Modal>
  );
}

ModalDeleteWaste.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  deleteWaste: propTypes.func.isRequired,
};

export default ModalDeleteWaste;
