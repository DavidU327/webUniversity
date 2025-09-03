import React from 'react';
import propTypes from 'prop-types';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function LevelListTable({ editLevel, deleteLevel }) {

  const allLevels = [{id: 1, level: 'Básico', status: 'active'}];

  const collectors = allLevels.map((user) => {
    const { id, level, status } = user;

    return {
      key: id,
      level,
      point_min: 0,
      point_max: 100,
      status: <span className={`status-text ${status}`}>Active</span>,
      change_state: <Switch defaultChecked size="large" />,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon"
                    type="info"
                    onClick={() => editLevel('Editar nivel', 'Editar')}
                    shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon"
                    onClick={deleteLevel}
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
      title: 'Nivel',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Puntos mínimos',
      dataIndex: 'point_min',
      key: 'point_min',
    },
    {
      title: 'Puntos máximos',
      dataIndex: 'point_max',
      key: 'point_max',
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

LevelListTable.propTypes = {
  editLevel: propTypes.func.isRequired,
  deleteLevel: propTypes.func.isRequired,
};

export default LevelListTable;
