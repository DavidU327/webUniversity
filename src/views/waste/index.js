import React, { useState } from 'react';
import { Col, Row } from 'antd';
import FeatherIcon from 'feather-icons-react';
import WasteListTable from './components/table';
import ModalFormWaste from './components/modalForm';
import ModalDeleteWaste from './components/modalDelete';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { Button } from '../../components/buttons';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';

function Waste(){
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
            title="Residuos"
            subTitle={
              <>
                <span className="title-counter">2 residuos</span>
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
              <Button onClick={() => showModal('Formulario nuevo residuo', 'Crear')} className="btn-add_new" size="default" type="primary" key="1">
                <FeatherIcon icon="plus" size={14} /> Nuevo residuo
              </Button>,
            ]}
          />
        </UserCardTop>
      </CardToolbox>
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <WasteListTable editWaste={showModal} deleteWaste={showModalDelete} />
          </Col>
        </Row>
      </Main>
      <ModalFormWaste
        visible={state.visible}
        onCancel={onCancel}
        title={state.title}
        textButton={state.textButton}
      />
      <ModalDeleteWaste
        deleteWaste={() => {}}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
    </>
  )
}

export default Waste;
