import React, { useEffect, useState } from 'react';
import { Empty, Table } from 'antd';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { StatusText } from '../../../collector/components/table/style';
import { Button } from '../../../../components/buttons';

const getAddress = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.name || 'Sin dirección';
};

function OrderListTable({openWaste, openUser, openCollector, morePage, handleCancelOrder, handleFinishOrder}) {
  const { allOrders, loading } = useSelector((state) => state.order);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await Promise.all(
        allOrders.map(async (order) => {
          const { id, latitude, longitude, date, state, user, collector, type_waste: typeWaste } = order;

          let address;
          const totalPoints = typeWaste.reduce((total, item) => {
            return total + item.points;
          }, 0);

          try {
            address = await getAddress(latitude, longitude);
          } catch (error) {
            address = 'No disponible';
          }

          return {
            key: id,

            order_id: (
              <figcaption>
                <span> {id}</span>
              </figcaption>
            ),
            address: (
              <figcaption>
                <span>{address}</span>
              </figcaption>
            ),
            date: (
              <figcaption>
                <span>{date.substring(0, 10)}</span>
              </figcaption>
            ),
            points: (
              <figcaption>
                <span>{totalPoints}</span>
              </figcaption>
            ),
            waste: (
              <button type="button" onClick={() => openWaste(order)} style={{ all: 'unset', cursor: 'pointer' }}>
                <span>Residuos</span>
              </button>
            ),
            user: (
              <button type="button" onClick={() => openUser(order)} style={{ all: 'unset', cursor: 'pointer' }}>
                <span>{user?.name}</span>
              </button>
            ),
            collector: (
              <button type="button" onClick={() => openCollector(order)} style={{ all: 'unset', cursor: 'pointer' }}>
                <span>{collector?.name || 'Sin asignar'}</span>
              </button>
            ),
            state: (
              <StatusText $color={state?.color}>{state?.name}</StatusText>
            ),
            action: (
              <div className="table-actions">
                {state?.name !== 'Cancelada' && state?.name !== 'Orden finalizada' && state?.name !== 'Recogido' && (
                  <Button className="btn-icon"
                          onClick={() => handleCancelOrder(order)}
                          type="info"
                          shape="circle">
                    <FeatherIcon icon="x-circle" size={16} />
                  </Button>
                )}
                {state?.name === 'Recogido' && (
                  <Button className="btn-icon"
                          onClick={() => handleFinishOrder(order)}
                          type="info" to="#"
                          shape="circle">
                    <FeatherIcon icon="check-circle" size={16} />
                  </Button>
                )}
              </div>
            ),
          };
        })
      );
      setOrders(data);
    };

    if (allOrders?.length) {
      loadOrders();
    }
  }, [allOrders]);

  const orderTableColumns = [
    {
      title: 'Orden',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Puntos',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'Residuos',
      dataIndex: 'waste',
      key: 'waste',
    },
    {
      title: 'Usario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Recolector',
      dataIndex: 'collector',
      key: 'collector',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Acciones',
      dataIndex: 'action',
      key: 'action',
      width: '10px',
      align: 'center',
    },
  ];

  return (
    <Cards headless>
      <TableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={orders}
            columns={orderTableColumns}
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              total: orders.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} de ${total}`,
            }}
            onChange={(pagination) => {
              const { current} = pagination;
              morePage(current)
            }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No hay órdenes aún"
                />
              ),
            }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

OrderListTable.propTypes = {
  openWaste: propTypes.func.isRequired,
  openUser: propTypes.func.isRequired,
  openCollector: propTypes.func.isRequired,
  morePage: propTypes.func.isRequired,
  handleCancelOrder: propTypes.func.isRequired,
  handleFinishOrder: propTypes.func.isRequired,
};

export default OrderListTable;
