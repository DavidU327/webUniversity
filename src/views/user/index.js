import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import UserListTable from './components/table';
import ModalDeleteUser from './components/modalDelete';
import {
  changeStateUser,
  cleanFormUser,
  deleteUser,
  getUsers,
  searchUser,
} from '../../redux/user/actionCreator';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { openNotification } from '../../utility/notification';

function User(){

  const dispatch = useDispatch();

  const {
    users,
    successForm,
    message,
  } = useSelector((state) => state.user);

  const [state, setState] = useState({
    notData: [],
    modalDelete: false,
    focus: {},
    search: '',
  });

  const showModalDelete = (user) => {
    setState({
      ...state,
      modalDelete: true,
      focus: user
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      modalDelete: false,
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
      dispatch(getUsers(1));
    }else{
      dispatch(searchUser(values, 1));
    }
  };

  const morePage = (page) => {
    if(state.search === ''){
      dispatch(getUsers(page));
    }else {
      dispatch(searchUser(state.search, page));
    }
  };

  const changeState = (userId) => {
    dispatch(changeStateUser(userId))
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser(state.focus.id));
  };

  useEffect(() => {
    dispatch(getUsers(1));
  }, []);

  useEffect(() => {
    if(successForm) {
      onCancel();
      openNotification('success', 'Enhorabuena', message);
      dispatch(cleanFormUser());
    }
  }, [successForm]);

  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Usuarios"
            subTitle={
              <>
                <span className="title-counter">{users.length} Usuarios</span>
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
            <UserListTable
              deleteUser={showModalDelete}
              morePage={morePage}
              changeState={changeState}
            />
          </Col>
        </Row>
      </Main>
      <ModalDeleteUser
        deleteUser={handleDeleteUser}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
    </>
  )
}

export default User;
