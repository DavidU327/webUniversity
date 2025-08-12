import React, { useState } from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../componentsDelete/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../componentsDelete/cards/frame/cards-frame';
import { Checkbox } from '../../componentsDelete/checkbox/checkbox';
import { Button } from '../../componentsDelete/buttons/buttons';
import { ShareButtonPageHeader } from '../../componentsDelete/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../componentsDelete/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../componentsDelete/buttons/calendar-button/calendar-button';

function Checkboxs() {
  const [state, setState] = useState({
    checkData: [],
    checked: null,
  });

  const multipleChange = (childData) => {
    setState({ ...state, checkData: childData });
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <>
      <PageHeader
        title="Checkbox"
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
          <Col md={12} xs={24}>
            <Cards title="Basic">
              <Checkbox onChange={onChange}>Checkbox</Checkbox>
            </Cards>
            <Cards title="Basic">
              <Checkbox onChange={onChange}>Checkbox</Checkbox>
            </Cards>
            <Cards title="Check all">
              <Checkbox
                multiple
                onChangeTriger={multipleChange}
                item={['Apple', 'Pear', 'Orange']}
                defaultSelect={['Pear']}
              />
            </Cards>
          </Col>
          <Col md={12} xs={24}>
            <Cards title="Disabled">
              <Checkbox defaultChecked={false} disabled />
              <br />
              <Checkbox defaultChecked disabled />
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Checkboxs;
