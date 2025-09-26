import React from 'react';
import { Spin } from 'antd';
import { SpinerWraperStyle } from './style';
import { Modal } from '../modal';

const ModalLoad = () => {
  return (
    <Modal
      visible
      footer={null}
      title=''
      width={120}
      closable={false}
    >
      <SpinerWraperStyle>
        <Spin />
      </SpinerWraperStyle>
    </Modal>
  );
};


export { ModalLoad };
