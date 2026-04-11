import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import WasteListTable from './components/table';
import ModalFormWaste from './components/modalForm';
import ModalDeleteWaste from './components/modalDelete';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { Button } from '../../components/buttons';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import {
  getWastes,
  selectWaste,
  deleteWaste,
  cleanWasteFormAction,
} from '../../redux/waste/actionCreator';

function Waste() {
  const dispatch = useDispatch();
  const { wastes, loading } = useSelector((state) => state.waste);

  const [state, setState] = useState({
    visible: false,
    modalDelete: false,
    title: '',
    textButton: '',
    searchText: '',
  });

  useEffect(() => {
    dispatch(getWastes());
  }, [dispatch]);

  const showModal = (title, textButton, waste = null) => {
    if (waste) {
      dispatch(selectWaste(waste));
    } else {
      dispatch(cleanWasteFormAction());
    }
    setState({ ...state, visible: true, title, textButton });
  };

  const showModalDelete = (waste) => {
    dispatch(selectWaste(waste));
    setState({ ...state, modalDelete: true });
  };

  const onCancel = () => {
    dispatch(cleanWasteFormAction());
    setState({ ...state, visible: false, modalDelete: false });
  };

  const handleDelete = (id) => {
    dispatch(deleteWaste(id, () => {
      setState({ ...state, modalDelete: false });
    }));
  };

  const handleSearch = (searchText) => {
    setState({ ...state, searchText });
  };

  const filteredWastes = state.searchText
    ? wastes.filter((item) =>
        item.name?.toUpperCase().startsWith(state.searchText.toUpperCase())
      )
    : wastes;

  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Residuos"
            subTitle={
              <>
                <span className="title-counter">{filteredWastes.length} residuo(s)</span>
                <AutoComplete
                  onSearch={handleSearch}
                  dataSource={filteredWastes}
                  placeholder="Buscar"
                  width="100%"
                  patterns
                />
              </>
            }
            buttons={[
              <Button
                onClick={() => showModal('Formulario nuevo residuo', 'Crear')}
                className="btn-add_new"
                size="default"
                type="primary"
                key="1"
              >
                <FeatherIcon icon="plus" size={14} /> Nuevo residuo
              </Button>,
            ]}
          />
        </UserCardTop>
      </CardToolbox>
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <WasteListTable
              wastes={filteredWastes}
              loading={loading}
              editWaste={showModal}
              deleteWaste={showModalDelete}
            />
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
        visible={state.modalDelete}
        onCancel={onCancel}
        onDelete={handleDelete}
      />
    </>
  );
}

export default Waste;
