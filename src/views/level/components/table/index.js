import React from 'react';
import propTypes from 'prop-types';
import { Empty, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function LevelListTable({ editLevel }) {

  const allLevels = [{id: 1, level: 'Básico'}];

  const collectors = allLevels.map((user) => {
    const { id, level } = user;

    return {
      key: id,
      level,
      point_min: 0,
      point_max: 100,
      action: (
        <div className="table-action">
          <Button className="btn-icon"
                  type="info"
                  onClick={() => editLevel('Editar nivel', 'Editar')}
                  shape="circle">
            <FeatherIcon icon="edit" size={16} />
          </Button>
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
      title: 'Acciones',
      dataIndex: 'action',
      key: 'action',
      width: '10px',
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
                description="No hay niveles aún" /> }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

LevelListTable.propTypes = {
  editLevel: propTypes.func.isRequired,
};

export default LevelListTable;
