import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../componentsDelete/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../componentsDelete/cards/frame/cards-frame';
import { Button } from '../../componentsDelete/buttons/buttons';
import { ShareButtonPageHeader } from '../../componentsDelete/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../componentsDelete/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../componentsDelete/buttons/calendar-button/calendar-button';

function BlankPage() {
  return (
    <>
      <PageHeader
        title="Starter"
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
            <Cards headless>
              <h3>Skeleton Page</h3>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default BlankPage;
