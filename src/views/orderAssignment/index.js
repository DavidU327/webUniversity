import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Main } from './style';
import ModalInitService from './components/modalInitService';
import { Cards } from '../../components/cards';
import { PageHeader } from '../../components/page-headers';
import { assignedCollector, clearOrder, getOrderDays, initOrder } from '../../redux/order/actionCreator';
import MapOrders from '../../components/mapOrders';
import { getRecollectorDashboard } from '../../redux/recollector/actionCreator';
import { Button } from '../../components/buttons';
import { openNotification } from '../../utility/notification';

function OrderAssignment() {

  const today = new Date().toLocaleDateString("en-CA");

  const dispatch = useDispatch();

  const {
    loadingForm,
    successForm,
    orders,
  } = useSelector((state) => state.order);
  const {
    dashboardRecollectors,
  } = useSelector((state) => state.recollector);

  const [state, setState] = useState({
    modalOrders: false,
    searchData: [],
    initOrders: []
  });

  const onCancel = () => {
    setState({
      ...state,
      modalOrders: false,
    });
  };

  const handleAssignCollector = (order, collector) => {
    dispatch(assignedCollector(order, collector));
  };

  const handleInitOrders = (values) => {
    dispatch(initOrder(values))
  }

  useEffect(() => {
    dispatch(getOrderDays(today));
    dispatch(getRecollectorDashboard());
  }, []);

  useEffect(() => {
    setState({
      ...state,
      initOrders: orders.filter((item) => item.state.id === 2)
    });
  }, [orders]);

  useEffect(() => {
    if(successForm){
      openNotification(
        "success",
        "Listo",
        "Ordenes Iniciadas"
      );
    }
    onCancel();
    dispatch(clearOrder());
  }, [successForm]);

  return (
    <>
      <PageHeader
        ghost
        title="Asignar órdenes"
        buttons={state.initOrders.length > 0 ? [
          <Button onClick={() => setState({
            ...state,
            modalOrders: true
          })}
                  className="btn-add_new" size="default" type="primary" key="1">
            Empezar Ordenes
          </Button>,
        ]: []}
      />
      <Main>
        <Row gutter={25}>
          <Col md={24} xs={24}>
            <Cards title="Asignación del dia" size="large">
              <MapOrders
                orders={orders}
                recollectors={dashboardRecollectors}
                assignCollector={handleAssignCollector}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
      {state.modalOrders && (
        <ModalInitService
          visible={state.modalOrders}
          onCancel={onCancel}
          orders={orders}
          initOrders={handleInitOrders}
          loading={loadingForm}
        />
      )}
    </>
  )
}

export default OrderAssignment;
