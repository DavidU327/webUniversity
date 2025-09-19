import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import CollectorListTable from './components/table';
import ModalFormCollector from './components/modalForm';
import ModalDeleteCollector from './components/modalDelete';
import { Button } from '../../components/buttons';
import { CardToolbox, UserCardTop, Main } from '../styled';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { cleanFormRecollector, getRecollector } from '../../redux/recollector/actionCreator';
import { getTypeIdentifications } from '../../redux/typeIdentification/actionCreator';
import { openNotification } from '../../utility/notification';

function Collector(){

  const dispatch = useDispatch();

  const {
    recollectors,
    successForm,
  } = useSelector((state) => state.recollector);

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

  useEffect(() => {
    dispatch(getRecollector());
    dispatch(getTypeIdentifications());
  }, []);

  useEffect(() => {
    if(successForm) {
      onCancel();
      openNotification('success', 'Enhorabuena', 'Se ha creado el recolector correctamente');
      dispatch(cleanFormRecollector());
    }
  }, [successForm]);

  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Recolectores"
            subTitle={
              <>
                <span className="title-counter">{recollectors.length} Recolectores</span>
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
              <Button onClick={() => showModal('Formulario nuevo recolector', 'Crear')} className="btn-add_new" size="default" type="primary" key="1">
                <FeatherIcon icon="plus" size={14} /> Nuevo recolector
              </Button>,
            ]}
          />
        </UserCardTop>
      </CardToolbox>
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <CollectorListTable
              editCollector={showModal}
              deleteCollector={showModalDelete}
            />
          </Col>
        </Row>
      </Main>
      <ModalFormCollector
        visible={state.visible}
        onCancel={onCancel}
        title={state.title}
        textButton={state.textButton}
      />
      <ModalDeleteCollector
        deleteCollector={() => {}}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
    </>
  )
}

export default Collector;
