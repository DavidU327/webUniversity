import React from 'react';
import propTypes from 'prop-types';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';

function ModalInitService({visible, onCancel, orders, initOrders, loading}) {

  const ordersInit = orders.filter((order) => order.state.id === 2);

  const handleInit = () => {
    const orderIds = ordersInit.map((order) => order.id);
    initOrders({
      order_ids: orderIds,
    })
  };

  return (
    <Modal
      type="primary"
      title="Lista de Ordenes para empezar"
      visible={visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" onClick={handleInit} loading={loading}  >
            Empezar Ordenes
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={onCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={onCancel}
    >
      <div className="project-modal">
        <span>Estos son las ordenes que van a ser empezados el día de hoy</span>
        {ordersInit.map((item, index) => (
          <div
            key={index}
            style={{
              padding: 12,
              borderRadius: 10,
              cursor: 'pointer',
              transition: '0.2s',
              border: '1px solid transparent'
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {item.user.name}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {item.user.phone}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

ModalInitService.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  orders: propTypes.array,
  initOrders: propTypes.func,
  loading: propTypes.bool,
};

export default ModalInitService;
