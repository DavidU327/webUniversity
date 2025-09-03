import React, { useState } from 'react';
import { Col, Row } from 'antd';
import OrderListTable from './components/table';
import { CardToolbox, Main, UserCardTop } from '../styled';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';

function Order(){

  const [state, setState] = useState({
    notData: [],
  });

  const handleSearch = (searchText) => {
    const data = state.notData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  return (
    <>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            ghost
            title="Órdenes"
            subTitle={
              <>
                <span className="title-counter">2 Órdenes</span>
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
            <OrderListTable />
          </Col>
        </Row>
      </Main>
    </>
  )
}

export default Order;
