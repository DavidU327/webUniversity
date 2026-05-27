import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Main } from './style';
import { Cards } from '../../components/cards';
import Map from '../../components/map';
import { CardToolbox, UserCardTop } from '../styled';
import { PageHeader } from '../../components/page-headers';
import { AutoComplete } from '../../components/autoComplete';
import { assignedCollector, getOrderDays } from '../../redux/order/actionCreator';
import MapOrders from '../../components/mapOrders';
import { getRecollectorDashboard } from '../../redux/recollector/actionCreator';

function Dashboard(){
  const today = new Date().toLocaleDateString("en-CA");

  const dispatch = useDispatch();

  const {
    orders,
  } = useSelector((state) => state.order);

  const {
    dashboardRecollectors,
  } = useSelector((state) => state.recollector);

  const [searchData, setSearchData] = useState([]);

  const handleSearch = (searchText) => {
    const data = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setSearchData(data);
  };

  const handleAssignCollector = (order, collector) => {
    dispatch(assignedCollector(order, collector));
  };

  useEffect(() => {
    dispatch(getOrderDays(today));
    dispatch(getRecollectorDashboard());
  }, []);

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
              <MapOrders
                orders={orders}
                recollectors={dashboardRecollectors}
                assignCollector={handleAssignCollector}
              />
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
                  <Map />
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
