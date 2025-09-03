import React, { useState } from 'react';
import { Col, Row } from 'antd';
import FeatherIcon from 'feather-icons-react';
import LevelListTable from './components/table';
import ModalFormLevel from './components/modalForm';
import ModalDeleteLevel from './components/modalDelete';
import { PageHeader } from '../../components/page-headers';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { Button } from '../../components/buttons';
import { AutoComplete } from '../../components/autoComplete';

function Level(){

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
            title="Niveles"
            subTitle={
              <>
                <span className="title-counter">2 Niveles</span>
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
              <Button onClick={() => showModal('Formulario nuevo nivel', 'Crear')} className="btn-add_new" size="default" type="primary" key="1">
                <FeatherIcon icon="plus" size={14} /> Nuevo nivel
              </Button>,
            ]}
          />
        </UserCardTop>
      </CardToolbox>
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <LevelListTable editLevel={showModal} deleteLevel={showModalDelete} />
          </Col>
        </Row>
      </Main>
      <ModalFormLevel
        visible={state.visible}
        onCancel={onCancel}
        title={state.title}
        textButton={state.textButton}
      />
      <ModalDeleteLevel
        deleteCollector={() => {}}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
    </>
  )
}

export default Level;
