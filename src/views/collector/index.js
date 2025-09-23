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
import { Button } from '../../components/buttons';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { openNotification } from '../../utility/notification';
import {
  changeStateListRecollector,
  cleanFormRecollector,
  getRecollector,
  getRecollectorStates,
} from '../../redux/recollector/actionCreator';
import { getTypeIdentifications } from '../../redux/typeIdentification/actionCreator';


function Collector(){

  const dispatch = useDispatch();

  const {
    recollectors,
    successForm,
    message,
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
    const data = state.notData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const changeListState = (stateId, recollectorId) => {
    dispatch(changeStateListRecollector(stateId, recollectorId))
  }
  useEffect(() => {
    dispatch(getRecollector());
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
              modalDocument={showModalDocument}
              modalChangeState={showModalChangeState}
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
    </>
  )
}

export default Collector;
