import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';

function ModalChangeStateCollector({ visible, onCancel, changeState, stateName, recollectorName }) {

  const {loadingForm} = useSelector((state) => state.recollector);

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  const handleCancel = () => {
    onCancel();
  };

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
      title="Cambiar estado"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="success" onClick={changeState} loading={loadingForm}>
            Confirmar
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <span>Se va a cambiar el usuario {recollectorName} al estado {stateName}, esta de acuerdo, después no puede cambiar de opción.</span>
    </Modal>
  );
}

ModalChangeStateCollector.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  changeState: propTypes.func.isRequired,
  stateName: propTypes.string.isRequired,
  recollectorName: propTypes.string.isRequired,
};

export default ModalChangeStateCollector;
