import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import TipListTable from './components/table';
import ModalFormTip from './components/modalForm';
import ModalDeleteTip from './components/modalDelete';
import { PageHeader } from '../../components/page-headers';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { AutoComplete } from '../../components/autoComplete';
import { Button } from '../../components/buttons';
import { openNotification } from '../../utility/notification';
import { cleanTipFormAction, getTips } from '../../redux/tip/actionCreator';


function Tip(){

  const dispatch = useDispatch();

  const {tips, successForm, message} = useSelector((state) => state.tip);

  const [state, setState] = useState({
    notData: [],
    visible: false,
    modalDelete: false,
    title: '',
    textButton: ''
  });

  const showModal = (title, textButton) => {
    setState({
      ...state,
      visible: true,
      title,
      textButton
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      modalDelete: false,
    });
  };


  const handleSearch = (searchText) => {
    const data = state.notData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const morePage = (page) => {
    if(state.search === ''){
      dispatch(getTips(page));
    }
  };


  useEffect(() => {
    dispatch(getTips(1));
  }, []);

  useEffect(() => {
    if(successForm) {
      onCancel();
      openNotification('success', 'Enhorabuena', message);
      dispatch(cleanTipFormAction());
    }
  }, [successForm]);


  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Tips"
            subTitle={
              <>
                <span className="title-counter">{tips.length} Tips</span>
                <AutoComplete
                  onSearch={handleSearch}
                  dataSource={state.notData}
                  placeholder="Buscar"
                  width="100%"
                  patterns
                />
              </>
            }
            buttons={[
              <Button onClick={() => showModal('Formulario nuevo tip', 'Crear')} className="btn-add_new" size="default" type="primary" key="1">
                <FeatherIcon icon="plus" size={14} /> Nuevo Tip
              </Button>,
            ]}
          />
        </UserCardTop>
      </CardToolbox>
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <TipListTable
              morePage={morePage}
              editTip={showModal}
            />
          </Col>
        </Row>
      </Main>
      <ModalFormTip
        visible={state.visible}
        onCancel={onCancel}
        title={state.title}
        textButton={state.textButton}
      />
      <ModalDeleteTip
        deleteTip={() => {}}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
    </>
  )
}

export default Tip;
