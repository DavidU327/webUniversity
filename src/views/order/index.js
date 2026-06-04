import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import OrderListTable from './components/table';
import ModalInfoUser from './components/modalInfoUser';
import ModalInfoWaste from './components/modalInfoWaste';
import ModalCancelOrder from './components/modalCancelOrder';
import ModalInfoCollector from './components/modalInfoCollector';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { cancelOrder, clearOrder, getOrders } from '../../redux/order/actionCreator';

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

  const confirmCancelOrder= () => {
    dispatch(cancelOrder(state.focus.id))
  };

  useEffect(() => {
    dispatch(getOrders(1));
  }, []);

  useEffect(() => {
    if(successForm){
      dispatch(clearOrder());
      setState({
        ...state,
        focus: null,
        modalCancel: false,
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
                  modalWaste: true,
                  focus: item
                });
              }}
              openUser={(item) => {
                setState({
                  ...state,
                  modalUser: true,
                  focus: item
                });
              }}
              openCollector={(item) => {
                setState({
                  ...state,
                  modalCollector: true,
                  focus: item
                });
              }}
              morePage={morePage}
              handleCancelOrder={handleCancelOrder}
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
    </>
  )
}

export default Order;
