import React from 'react';
import { Row, Col, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserOutlined } from '@ant-design/icons';
import { PageHeader } from '../../componentsDelete/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../componentsDelete/cards/frame/cards-frame';
import { Button } from '../../componentsDelete/buttons/buttons';
import { ShareButtonPageHeader } from '../../componentsDelete/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../componentsDelete/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../componentsDelete/buttons/calendar-button/calendar-button';

const { TextArea } = Input;
function Inputs() {
  return (
    <>
      <PageHeader
        ghost
        title="Input"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <div className="input-wrap">
          <Row gutter={25}>
            <Col md={12} sm={12} xs={24}>
              <Cards title="Basic">
                <Input placeholder="Basic usage" />
              </Cards>
              <Cards title="Textarea">
                <TextArea rows={4} />
              </Cards>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Cards title="Three sizes of Input">
                <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
                <br />
                <br />
                <Input placeholder="default size" prefix={<UserOutlined />} />
                <br />
                <br />
                <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
              </Cards>
            </Col>
          </Row>
        </div>
      </Main>
    </>
  );
}

export default Inputs;
