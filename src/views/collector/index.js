import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import CollectorListTable from './components/table';
import ModalFormCollector from './components/modalForm';
import ModalDeleteCollector from './components/modalDelete';
import ModalUploadCollector from './components/modaUploadDocument';
import ModalChangeStateCollector from './components/modalChangeState';
import { CardToolbox, UserCardTop, Main } from '../styled';
import {
  changeStateListRecollector,
  changeStateRecollector,
  cleanFormRecollector,
  deleteRecollector,
  getRecollector,
  getRecollectorStates,
  searchRecollector,
} from '../../redux/recollector/actionCreator';
import { Button } from '../../components/buttons';
import { ModalLoad } from '../../components/modalLoad';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { openNotification } from '../../utility/notification';
import { getTypeIdentifications } from '../../redux/typeIdentification/actionCreator';

function Collector(){

  const dispatch = useDispatch();

  const {
    recollectors,
    successForm,
    message,
    loadingState,
  } = useSelector((state) => state.recollector);

  const [state, setState] = useState({
    notData: [],
    visible: false,
    modalDocument: '',
    modalDelete: false,
    modalChangeState: false,
    focus: {},
    stateFocus: {},
    title: '',
    textButton: '',
    search: '',
  });

  const showModal = (title, textButton, collector) => {
    setState({
      ...state,
      visible: true,
      title,
      textButton,
      focus: collector
    });
  };

  const showModalDelete = (collector) => {
    setState({
      ...state,
      modalDelete: true,
      focus: collector
    });
  };

  const showModalDocument = (modal, collector) => {
    setState({
      ...state,
      modalDocument: modal,
      focus: collector
    });
  };

  const showModalChangeState = (collector, state) => {
    setState({
      ...state,
      modalDocument: '',
      modalChangeState: true,
      focus: collector,
      stateFocus: state,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      modalDelete: false,
      modalChangeState: false,
      modalDocument: '',
      focus: {}
    });
  };

  const handleSearch = (searchText) => {
    const values = {
      search: searchText
    }
    setState({
      ...state,
      search: searchText
    });
    if(searchText === ''){
      dispatch(getRecollector(1));
    }else{
      dispatch(searchRecollector(values, 1));
    }
  };

  const changeListState = (stateId, recollectorId) => {
    dispatch(changeStateListRecollector(stateId, recollectorId))
  }

  const changeState = (recollectorId) => {
    dispatch(changeStateRecollector(recollectorId))
  }

  const morePage = (page) => {
    if(state.search === ''){
      dispatch(getRecollector(page));
    }else{
      dispatch(searchRecollector(state.search, page));
    }
  };

  const handleDeleteRecollector = () => {
    dispatch(deleteRecollector(state.focus.collector.id));
  };

  useEffect(() => {
    dispatch(getRecollector(1));
    dispatch(getTypeIdentifications());
    dispatch(getRecollectorStates());
  }, []);

  useEffect(() => {
    if(successForm) {
      onCancel();
      openNotification('success', 'Enhorabuena', message);
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
              <Button onClick={() => showModal('Formulario nuevo recolector', 'Crear', {})} className="btn-add_new" size="default" type="primary" key="1">
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
              modalDocument={showModalDocument}
              modalChangeState={showModalChangeState}
              changeState={changeState}
              morePage={morePage}
            />
          </Col>
        </Row>
      </Main>
      <ModalFormCollector
        visible={state.visible}
        onCancel={onCancel}
        title={state.title}
        textButton={state.textButton}
        recollector={state.focus.collector}
      />
      <ModalDeleteCollector
        deleteCollector={handleDeleteRecollector}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
      {state.modalDocument !== '' && (
        <ModalUploadCollector
          visible={state.modalDocument}
          onCancel={onCancel}
          id={state.focus.collector.id}
        />
      )}
      {state.modalChangeState && (
        <ModalChangeStateCollector
          visible
          stateName={state.stateFocus.name}
          onCancel={onCancel}
          changeState={() => changeListState(state.stateFocus.id, state.focus.collector.id)}
          recollectorName={state.focus.collector.user.name}
        />
      )}
      {loadingState && (
        <ModalLoad />
      )}
    </>
  )
}

export default Collector;
