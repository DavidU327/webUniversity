
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Empty, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';
import { getLevels, selectLevel } from '../../../../redux/level/actionCreator';

function LevelListTable({ editLevel }) {
  const dispatch = useDispatch();
  const { levels, loading } = useSelector((state) => state.level);
  useEffect(() => {
    dispatch(getLevels());
  }, [dispatch]);

  const handleEdit = (level) => {
    dispatch(selectLevel(level));
    editLevel('Editar nivel', 'Editar');
  };

  const dataSource = Array.isArray(levels)
    ? levels.map((level) => ({
        key: level.id,
        level: level.name || level.level,
        point_min: level.min_point,
        point_max: level.max_point,
        ...level,
        action: (
          <div className="table-action">
            <Button className="btn-icon"
                    type="info"
                    onClick={() => handleEdit(level)}
                    shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
          </div>
        ),
      }))
    : [];

  const columns = [
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
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{
              defaultPageSize: 5,
              total: dataSource.length,
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
