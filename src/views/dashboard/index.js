import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Main } from './style';
import { Cards } from '../../components/cards';
import { GoogleMaps } from '../../components/map';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { CardToolbox, UserCardTop } from '../styled';

function Dashboard(){

  const [searchData, setSearchData] = useState([]);

  const handleSearch = (searchText) => {
    const data = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setSearchData(data);
  };

  return (
    <>
      <PageHeader
        ghost
        title="Dashboard"
      />
      <Main>
        <Row gutter={25}>
          <Col md={24} xs={24}>
            <Cards title="Asignación del dia" size="large">
              <GoogleMaps latitude='4.57926' longitude='-74.15831' />
            </Cards>
          </Col>
        </Row>
      </Main>
      <CardToolbox>
        <UserCardTop>
          <PageHeader
            title="Recolectores"
            styleAlternative={{ marginTop: '-50px'}}
            subTitle={
              <>
                <span className="title-counter">274 Recolectores</span>
                <AutoComplete
                  onSearch={handleSearch}
                  dataSource={searchData}
                  placeholder="Buscar"
                  width="100%"
                  patterns
                />
              </>
            }
          />
          <Main>
            <Row gutter={25}>
              <Col md={24} xs={24}>
                <Cards title="Ubicación recolectores" size="large">
                  <GoogleMaps latitude='4.57926' longitude='-74.15831' />
                </Cards>
              </Col>
            </Row>
          </Main>
        </UserCardTop>
      </CardToolbox>
    </>
  )
}

export default Dashboard;
