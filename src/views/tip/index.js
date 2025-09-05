import React, { useState } from 'react';
import { Col, Row } from 'antd';
import FeatherIcon from 'feather-icons-react';
import TipListTable from './components/table';
import ModalFormTip from './components/modalForm';
import ModalDeleteTip from './components/modalDelete';
import { PageHeader } from '../../components/page-headers';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { AutoComplete } from '../../components/autoComplete';
import { Button } from '../../components/buttons';

function Tip(){

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

  const showModalDelete = () => {
    setState({
      ...state,
      modalDelete: true,
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

  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Tips"
            subTitle={
              <>
                <span className="title-counter">2 Tips</span>
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
            <TipListTable editTip={showModal} deleteTip={showModalDelete} />
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
