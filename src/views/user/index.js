import React, { useState } from 'react';
import { Col, Row } from 'antd';
import UserListTable from './components/table';
import ModalDeleteUser from './components/modalDelete';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';

function User(){

  const [state, setState] = useState({
    notData: [],
    modalDelete: false,
  });

  const showModalDelete = () => {
    setState({
      ...state,
      modalDelete: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
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
            title="Usuarios"
            subTitle={
              <>
                <span className="title-counter">274 Usuarios</span>
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
            <UserListTable deleteUser={showModalDelete} />
          </Col>
        </Row>
      </Main>
      <ModalDeleteUser
        deleteUser={() => {}}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
    </>
  )
}

export default User;
