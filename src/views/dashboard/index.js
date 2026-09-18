import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './components/cards';
import Table from './components/tables';
import { Main } from './style';
import { PageHeader } from '../../components/page-headers';
import {
  dateUserOrderDashboard,
  getAllCollectorsDashboard,
  getAllOrdersDashboard,
  getAllUsersDashboard,
  totalCollectorOrderDashboard,
  totalUserLevelDashboard,
  totalUserOrderDashboard,
} from '../../redux/dashboard/actionCreator';

function Dashboard(){

  const dispatch = useDispatch();

  const {
    totalUsers,
    totalOrders,
    totalActivesOrder,
    totalCollectors,
    listTotalUser,
    listTotalCollectors,
    listDateUser,
    listTotalUserLevel,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getAllUsersDashboard());
    dispatch(getAllOrdersDashboard());
    dispatch(getAllCollectorsDashboard());
    dispatch(totalUserOrderDashboard());
    dispatch(totalCollectorOrderDashboard());
    dispatch(dateUserOrderDashboard());
    dispatch(totalUserLevelDashboard());
  }, []);

  return (
    <>
      <PageHeader ghost title="Dashboard" buttons={[]} />
      <Main>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Card
            title="Total usuarios"
            background="#FF69A520"
            nameIcon="users"
            colorIcon="#FF69A5"
            quantity={totalUsers}
          />

          <Card
            title="Órdenes activas"
            background="#20C99710"
            nameIcon="shopping-cart"
            colorIcon="#20C997"
            quantity={totalActivesOrder}
          />

          <Card
            title="Total Recolectores"
            background="#5F63F220"
            nameIcon="truck"
            colorIcon="#5F63F2"
            quantity={totalCollectors}
          />

          <Card
            title="Total Órdenes"
            background="#20C99710"
            nameIcon="shopping-cart"
            colorIcon="#20C997"
            quantity={totalOrders}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '30px',
            width: '100%',
          }}
        >
          <Table firstLabel="Usuario" secondLabel="Total solicitudes" items={listTotalUser} />

          <Table firstLabel="Recolector" secondLabel="Total recogidas" items={listTotalCollectors} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '30px',
            width: '100%',
          }}
        >
          <Table firstLabel="Usuario" secondLabel="Última solicitud" items={listDateUser} />

          <Table firstLabel="Niveles" secondLabel="Cantidad de usuarios" items={listTotalUserLevel} />
        </div>
      </Main>
    </>
  );
}

export default Dashboard;
