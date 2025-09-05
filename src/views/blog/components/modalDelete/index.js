import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';


function ModalDeleteBlog({ visible, onCancel, deleteBlog }) {

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
      title="Eliminar blog"
      visible={state.visible}
      footer={[
        <div key="1" >
          <Button size="default" type="danger" key="submit" onClick={deleteBlog}>
            Eliminar blog
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <span>De verdad desea eliminar el blog, esto no se puede reversar</span>
    </Modal>
  );
}

ModalDeleteBlog.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  deleteBlog: propTypes.func.isRequired,
};

export default ModalDeleteBlog;
