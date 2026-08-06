import React, { useState, useEffect } from 'react';
import { Form, Input, Upload } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper, PhotoUploadWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import Heading from '../../../../components/heading';
import { createBlog, updatedBlog } from '../../../../redux/blog/actionCreator';

function ModalFormBlog({ visible, onCancel, title, textButton, blog }) {

  const dispatch = useDispatch();

  const {loadingForm} = useSelector((state) => state.blog);

  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState( null);

  const handleUploadChange = (info) => {
    if (info?.file) {
      const url = URL.createObjectURL(info.file);
      setImageUrl({
        url,
        file: info.file
      });
    }
  };

  const handleOk = () => {
    const values = form.getFieldsValue();

    if(blog?.id){
      dispatch(updatedBlog({...values, imageUrl}, blog.id))
    }else {
      dispatch(createBlog({...values, imageUrl}));
    }
    /*
    *  if(recollector?.user){
      dispatch(updateRecollector(recollector?.id, {...values, imageUrl, documentIdentification, documentDriving}, defaultUser));
    }else {
      dispatch(createRecollector({...values, imageUrl, documentIdentification, documentDriving}));
    }
    * */
  };

  const handleCancel = () => {
    onCancel();
  };

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  useEffect(() => {
    if (blog) {
      form.setFieldsValue({
        title: blog.title || '',
        description: blog.description || '',
        url: blog.url || '',
      });
    }else{
      form.setFieldsValue({
        title:  '',
        description:  '',
        url: '',
      });
    }
  }, [blog, form,]);


  return (
    <Modal
      type={state.modalType}
      title={title}
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" onClick={() => form.submit()} loading={loadingForm}  >
            {textButton}
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancelar
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="blog" onFinish={handleOk}>
            <Form.Item
              name="title"
              label="Título"
              rules={[
                { required: true, message: 'Escribe el título' },
              ]}
            >
              <Input placeholder="Título del blog" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripción"
              rules={[
                { required: true, message: 'Escribe la descripción' },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Descripción del blog" />
            </Form.Item>
            <Form.Item
              name="url"
              label="URL"
              rules={[
                { required: true, message: 'Escribe la url' }
              ]}
            >
              <Input placeholder="Url del blog" />
            </Form.Item>
            <div className="info">
              <Heading as="h6">Imagen</Heading>
            </div>
            <Form.Item
              name="image"
              label="Imagen de Perfil"
              rules={[
                { required:  !blog?.image, message: 'Suba una imagen' },
              ]}
            >
              <PhotoUploadWrapper>
                <img
                  src={
                    imageUrl?.url ? imageUrl.url : blog?.image ?
                      blog.image : require('../../../../assets/image/changeImage.jpg')}
                  alt="profile"
                />
                <figcaption>
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleUploadChange}
                  >
                    <div className="upload-btn">
                      <FeatherIcon icon="camera" size={18} fill="#FFFFFF" />
                    </div>
                  </Upload>
                </figcaption>
              </PhotoUploadWrapper>
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}

ModalFormBlog.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  textButton: propTypes.string.isRequired,
  blog: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    url: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
  }).isRequired,
};

export default ModalFormBlog;
