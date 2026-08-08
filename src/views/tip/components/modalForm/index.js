import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { BasicFormWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import { createTip, updateTip } from '../../../../redux/tip/actionCreator';


function ModalFormTip({ visible, onCancel, title, textButton, tip }) {

  const dispatch = useDispatch();

  const {loadingForm} = useSelector((state) => state.tip);

  const [form] = Form.useForm();

  const handleOk = () => {
    const values = form.getFieldsValue();
    if(tip?.id){
      dispatch(updateTip(tip.id, values));
    }else {
      dispatch(createTip(values));
    }
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
    if (tip) {
      form.setFieldsValue({
        title: tip.title || '',
        description: tip.description || '',
      });
    }else{
      form.setFieldsValue({
        title:  '',
        description:  '',
      });
    }
  }, [tip, form]);

  return (
    <Modal
      type={state.modalType}
      title={title}
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={() => form.submit()} loading={loadingForm} >
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
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}

ModalFormTip.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  textButton: propTypes.string.isRequired,
  tip: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
  }).isRequired,
};

export default ModalFormTip;
