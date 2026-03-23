import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import Heading from '../../../../components/heading';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';
import { StatusText } from '../../../collector/components/table/style';


function UserListTable({
                         deleteUser,
                         morePage,
                         changeState,
}) {

  const {
    users
  } = useSelector((state) => state.user);

  const usersTable = users.map((user) => {
    const {
      id,
      name,
      photo,
      identification,
      phone,
      email,
      type_identification: typeIdentification,
      state,
      points,
    } = user;

    return {
      key: id,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '80px', height: '80px', borderRadius: '10px'  }} src={photo} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      phone,
      document: <figcaption>
        <span>{typeIdentification?.name}</span>
        <span>{identification}</span>
      </figcaption>,
      email,
      points,
      status: <StatusText $color={state?.color}>{state?.name}</StatusText>,
      change_state: <Switch checked={state?.name === 'Habilitado'} size="large" onChange={() => changeState(id)} />,
      action: (
        <div className="table-actions" style={{ display: 'flex', justifyContent: 'center' }}>
          <>
            <Button className="btn-icon"
                    onClick={() => deleteUser(user)}
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
            dataSource={usersTable}
            columns={userTableColumns}
            pagination={{
              defaultPageSize: 10,
              total: usersTable.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            }}
            onChange={(pagination) => {
              const { current} = pagination;
              morePage(current)
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
  changeState: propTypes.func.isRequired,
  morePage: propTypes.func.isRequired,
};

export default UserListTable;
