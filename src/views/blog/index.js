import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import BlogListTable from './components/table';
import ModalFormBlog from './components/modalForm';
import ModalDeleteBlog from './components/modalDelete';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { Button } from '../../components/buttons';
import { AutoComplete } from '../../components/autoComplete';
import { PageHeader } from '../../components/page-headers';
import { cleanBlogFormAction, getBlogs } from '../../redux/blog/actionCreator';
import { openNotification } from '../../utility/notification';

function Blog(){

  const dispatch = useDispatch();

  const {blogs, successForm, message} = useSelector((state) => state.blog);

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

  const morePage = (page) => {
    if(state.search === ''){
      dispatch(getBlogs(page));
    }
  };


  useEffect(() => {
    dispatch(getBlogs(1));
  }, []);

  useEffect(() => {
    if(successForm) {
      onCancel();
      openNotification('success', 'Enhorabuena', message);
      dispatch(cleanBlogFormAction());
    }
  }, [successForm]);


  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Blogs"
            subTitle={
              <>
                <span className="title-counter">{blogs.length} Blogs</span>
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
              <Button onClick={() => showModal('Formulario nuevo blog', 'Crear')} className="btn-add_new" size="default" type="primary" key="1">
                <FeatherIcon icon="plus" size={14} /> Nuevo Blog
              </Button>,
            ]}
          />
        </UserCardTop>
      </CardToolbox>
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <BlogListTable
              editBlog={showModal}
              deleteBlog={showModalDelete}
              morePage={morePage}
            />
          </Col>
        </Row>
      </Main>
      <ModalFormBlog
        visible={state.visible}
        onCancel={onCancel}
        title={state.title}
        textButton={state.textButton}
      />
      <ModalDeleteBlog
        deleteBlog={() => {}}
        visible={state.modalDelete}
        onCancel={onCancel}
      />
    </>
  )
}
export default Blog;
