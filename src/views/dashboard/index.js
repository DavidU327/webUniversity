import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './components/cards';
import Table from './components/tables';
import { Main } from './style';
import { PageHeader } from '../../components/page-headers';
import { getAllUsers } from '../../redux/dashboard/actionCreator';

function Dashboard(){

  const dispatch = useDispatch();

  const {
    totalUsers,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getAllUsers());
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
            quantity={10}
          />

          <Card title="Total Recolectores" background="#5F63F220" nameIcon="truck" colorIcon="#5F63F2" quantity={10} />

          <Card
            title="Total Órdenes"
            background="#20C99710"
            nameIcon="shopping-cart"
            colorIcon="#20C997"
            quantity={10}
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
          <Table firstLabel="Usuario" secondLabel="Total solicitudes" />

          <Table firstLabel="Recolector" secondLabel="Total recogidas" />
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
          <Table firstLabel="Usuario" secondLabel="Última solicitud" />

          <Table firstLabel="Niveles" secondLabel="Cantidad de usuarios" />
        </div>
      </Main>
    </>
  );
}

export default Dashboard;
