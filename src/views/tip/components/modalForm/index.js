import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { BasicFormWrapper } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';
import { createTip } from '../../../../redux/tip/actionCreator';


function ModalFormTip({ visible, onCancel, title, textButton }) {

  const dispatch = useDispatch();

  const {loadingForm} = useSelector((state) => state.tip);

  const [form] = Form.useForm();

  const handleOk = () => {
    const values = form.getFieldsValue();
    dispatch(createTip(values));
    //
    // onCancel();
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
};

export default ModalFormTip;
