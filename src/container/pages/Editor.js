import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../componentsDelete/page-headers/page-headers';
import { Main } from '../styled';
import { Button } from '../../componentsDelete/buttons/buttons';
import { ShareButtonPageHeader } from '../../componentsDelete/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../componentsDelete/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../componentsDelete/buttons/calendar-button/calendar-button';
import MailComposer from '../email/overview/MailComposer';
import Compose from '../email/overview/Compose';

function Editors() {
  return (
    <>
      <PageHeader
        title="Editors"
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
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <div className="editor-compose">
              <MailComposer text />
            </div>
          </Col>
          <Col sm={24} xs={24}>
            <MailComposer />
          </Col>
          <Col sm={24} xs={24}>
            <div className="editor-compose">
              <Compose />
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Editors;
