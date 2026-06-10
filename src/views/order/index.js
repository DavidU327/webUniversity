import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import OrderListTable from './components/table';
import ModalInfoUser from './components/modalInfoUser';
import ModalInfoWaste from './components/modalInfoWaste';
import ModalFinishOrder from './components/modalFinishOrder';
import ModalCancelOrder from './components/modalCancelOrder';
import ModalInfoCollector from './components/modalInfoCollector';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { cancelOrder, clearOrder, finishOrder, getOrders } from '../../redux/order/actionCreator';
import { getWastes } from '../../redux/waste/actionCreator';

function Order(){

  const dispatch = useDispatch();

  const {
    allOrders,
    loadingForm,
    successForm,
  } = useSelector((state) => state.order);

  const [state, setState] = useState({
    notData: [],
    modalWaste: false,
    modalUser: false,
    modalCollector: false,
    modalCancel: false,
    modalFinish: false,
    focus: null,
  });

  const handleSearch = (searchText) => {
    const data = state.notData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const cleanModals = () => {
    setState({
      ...state,
      modalWaste: false,
      modalUser: false,
      modalCollector: false,
      modalCancel: false,
      modalFinish: false,
      focus: null,
    });
  }

  const morePage = (page) => {
    if(state.search === ''){
      dispatch(getOrders(page));
    }
  };

  const handleCancelOrder = (order) => {
    setState({
      ...state,
      focus: order,
      modalCancel: true,
    });
  };

  const handleFinishOrder = (order) => {
    setState({
      ...state,
      focus: order,
      modalFinish: true,
    });
  };

  const confirmCancelOrder= () => {
    dispatch(cancelOrder(state.focus.id))
  };

  const confirmFinishOrder = (wastes) => {
    const values = {
      order_id: state.focus.id,
      user_id: state.focus.user.id,
      items: wastes.map((waste) => ({
        type_waste_id: waste.type_waste_id,
        weight: waste.weight,
        points: waste.points,
      })),
    };
    dispatch(finishOrder(values))
  };

  useEffect(() => {
    dispatch(getOrders(1));
    dispatch(getWastes());
  }, []);

  useEffect(() => {
    if(successForm){
      dispatch(clearOrder());
      setState({
        ...state,
        focus: null,
        modalCancel: false,
        modalFinish: false,
      });
    }
  }, [successForm]);

  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Órdenes"
            subTitle={
              <>
                <span className="title-counter">{allOrders.length} Órdenes</span>
                <AutoComplete
                  onSearch={handleSearch}
                  dataSource={state.notData}
                  placeholder="Buscar"
                  width="100%"
                  patterns
                />
              </>
            }
          />
        </UserCardTop>
      </CardToolbox>
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <OrderListTable
              openWaste={(item) => {
                setState({
                  ...state,
                  modalFinish: false,
                  modalWaste: true,
                  focus: item
                });
              }}
              openUser={(item) => {
                setState({
                  ...state,
                  modalFinish: false,
                  modalUser: true,
                  focus: item
                });
              }}
              openCollector={(item) => {
                setState({
                  ...state,
                  modalFinish: false,
                  modalCollector: true,
                  focus: item
                });
              }}
              morePage={morePage}
              handleCancelOrder={handleCancelOrder}
              handleFinishOrder={handleFinishOrder}
            />
          </Col>
        </Row>
      </Main>
      {state.focus && (
        <ModalInfoWaste
          visible={state.modalWaste}
          wastes={state.focus?.type_waste}
          onCancel={cleanModals}
        />
      )}
      {state.focus && (
        <ModalInfoUser
          visible={state.modalUser}
          user={state.focus?.user}
          onCancel={cleanModals}
        />
      )}
      {state.focus && (
        <ModalInfoCollector
          visible={state.modalCollector}
          collector={state.focus?.collector}
          onCancel={cleanModals}
        />
      )}
      {state.focus && (
        <ModalCancelOrder
          visible={state.modalCancel}
          order={state.focus}
          onCancel={cleanModals}
          loading={loadingForm}
          confirmCancelOrder={confirmCancelOrder}
        />
      )}
      {state.focus && (
        <ModalFinishOrder
          visible={state.modalFinish}
          order={state.focus}
          onCancel={cleanModals}
          loading={loadingForm}
          confirmFinishOrder={confirmFinishOrder}
        />
      )}
    </>
  )
}

export default Order;
