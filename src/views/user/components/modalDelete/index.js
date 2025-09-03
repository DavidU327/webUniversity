import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';


function ModalDeleteUser({ visible, onCancel, deleteUser }) {

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
      title="Eliminar recolector"
      visible={state.visible}
      footer={[
        <div key="1" >
          <Button size="default" type="danger" key="submit" onClick={deleteUser}>
            Eliminar usuario
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <span>De verdad desea eliminar el usuario, esto no se puede reversar</span>
    </Modal>
  );
}

ModalDeleteUser.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  deleteUser: propTypes.func.isRequired,
};

export default ModalDeleteUser;
