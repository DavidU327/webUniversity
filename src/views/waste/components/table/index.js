import React from 'react';
import propTypes from 'prop-types';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function WasteListTable({ editWaste, deleteWaste }) {

  const allWastes = [{id: 1, name: 'Juan', status: 'active'}];

  const waste = allWastes.map((user) => {
    const { id, status } = user;

    return {
      key: id,
      name: 'Básico',
      point: 123,
      status: <span className={`status-text ${status}`}>Active</span>,
      change_state: <Switch defaultChecked size="large" />,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon"
                    type="info"
                    onClick={() => editWaste('Editar residuo', 'Editar')}
                    shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon"
                    onClick={deleteWaste}
                    type="danger" to="#"
                    shape="circle">
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </>
        </div>
      ),
    };
  });

  const wasteTableColumns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Puntos por kilo',
      dataIndex: 'point',
      key: 'point',
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
            dataSource={waste}
            columns={wasteTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: waste.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            }}
            locale={{ emptyText: <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay residuos aún" /> }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

WasteListTable.propTypes = {
  editWaste: propTypes.func.isRequired,
  deleteWaste: propTypes.func.isRequired,
};

export default WasteListTable;
