import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { StatusText, TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import Heading from '../../../../components/heading';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function CollectorListTable({ editCollector, deleteCollector }) {

  const {
    recollectors,
    loading,
  } = useSelector((state) => state.recollector);

  const collectors = recollectors.map((recollector) => {
    console.log(recollector, 'usuario');
    const {
      collector: {
        id,
        user: {
          name,
          image,
          identification,
          email,
          phone,
          typeIdentification,
        },
        state,
      },
    } = recollector;

    return {
      key: id,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={image} alt="" />
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
      status: <StatusText $color={state?.color}>{state?.name}</StatusText>,
      change_state: <Switch checked={state?.name === 'Habilitado'} size="large" />,
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
      align: 'center',
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
            loading={loading}
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
