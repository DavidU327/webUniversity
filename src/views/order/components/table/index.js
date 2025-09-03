import React from 'react';
import { Empty, Table } from 'antd';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import Heading from '../../../../components/heading';
import { Cards } from '../../../../components/cards';

function OrderListTable() {

  const allUsers = [{id: 1, name: 'Juan', status: 'active'}];

  const users = allUsers.map((user) => {
    const { id, name, status } = user;

    return {
      key: id,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/250px-User_icon_2.svg.png" alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      collector: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/250px-User_icon_2.svg.png" alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      address: 'Carrera 110 # 80 70',
      date: '1 de agosto de 2025',
      status: <span className={`status-text ${status}`}>Active</span>,
    };
  });

  const userTableColumns = [
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Recolector',
      dataIndex: 'collector',
      key: 'collector',
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
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      align: 'center'
    },
  ];

  return (
    <Cards headless>
      <TableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={users}
            columns={userTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: users.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            }}
            locale={{ emptyText: <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay órdenes aún" /> }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

export default OrderListTable;
