import React from 'react';
import propTypes from 'prop-types';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import Heading from '../../../../components/heading';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function CollectorListTable({ editCollector, deleteCollector }) {

  const allCollectors = [{id: 1, name: 'Juan', status: 'active'}];

  const collectors = allCollectors.map((user) => {
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
      status: <span className={`status-text ${status}`}>Active</span>,
      change_state: <Switch defaultChecked size="large" />,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon"
                    type="info"
                    onClick={() => editCollector('Editar recolector', 'Editar')}
                    shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon"
                    onClick={deleteCollector}
                    type="danger" to="#"
                    shape="circle">
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </>
        </div>
      ),
    };
  });

  const collectorTableColumns = [
    {
      title: 'Recolector',
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
            dataSource={collectors}
            columns={collectorTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: collectors.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            }}
            locale={{ emptyText: <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay recolectores aún" /> }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

CollectorListTable.propTypes = {
  editCollector: propTypes.func.isRequired,
  deleteCollector: propTypes.func.isRequired,
};

export default CollectorListTable;
