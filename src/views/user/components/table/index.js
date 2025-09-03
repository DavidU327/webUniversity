import React from 'react';
import propTypes from 'prop-types';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import Heading from '../../../../components/heading';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function UserListTable({ deleteUser }) {

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
      phone: '3178874640',
      document: <figcaption>
        <span>C.C</span>
        <span>101427321</span>
      </figcaption>,
      email: 'john@gmail.com',
      points: 12,
      status: <span className={`status-text ${status}`}>Active</span>,
      change_state: <Switch defaultChecked size="large" />,
      action: (
        <div className="table-actions" style={{ display: 'flex', justifyContent: 'center' }}>
          <>
            <Button className="btn-icon"
                    onClick={deleteUser}
                    type="danger" to="#"
                    shape="circle">
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </>
        </div>
      ),
    };
  });

  const userTableColumns = [
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Documento',
      dataIndex: 'document',
      key: 'document',
    },
    {
      title: 'Correo electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Puntos',
      dataIndex: 'points',
      key: 'points',
      align: 'center',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Cambiar estado',
      dataIndex: 'change_state',
      key: 'change_state',
      align: 'center',
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
            dataSource={users}
            columns={userTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: users.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            }}
            locale={{ emptyText: <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay usuarios aún" /> }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

UserListTable.propTypes = {
  deleteUser: propTypes.func.isRequired,
};

export default UserListTable;
