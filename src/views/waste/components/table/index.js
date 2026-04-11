import React from 'react';
import propTypes from 'prop-types';
import { Empty, Switch, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';
import { toggleStatusWaste } from '../../../../redux/waste/actionCreator';

function WasteListTable({ wastes, loading, editWaste, deleteWaste }) {
  const dispatch = useDispatch();
  const { loadingToggle } = useSelector((state) => state.waste);

  const handleToggle = (waste) => {
    dispatch(toggleStatusWaste(waste.id));
  };

  const wasteRows = wastes.map((item) => {
    const { id, name, points_per_kilo, status } = item;
    const isActive = status === 'active' || status === 1 || status === true;

    return {
      key: id,
      name,
      points_per_kilo: points_per_kilo ?? '-',
      status: (
        <span className={`status-text ${isActive ? 'active' : 'deactivate'}`}>
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
      ),
      change_state: (
        <Switch
          checked={isActive}
          loading={loadingToggle}
          onChange={() => handleToggle(item)}
          size="default"
        />
      ),
      action: (
        <div className="table-actions">
          <Button
            className="btn-icon"
            type="info"
            onClick={() => editWaste('Editar residuo', 'Editar', item)}
            shape="circle"
          >
            <FeatherIcon icon="edit" size={16} />
          </Button>
          <Button
            className="btn-icon"
            type="danger"
            onClick={() => deleteWaste(item)}
            shape="circle"
          >
            <FeatherIcon icon="trash-2" size={16} />
          </Button>
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
      dataIndex: 'points_per_kilo',
      key: 'points_per_kilo',
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table
              dataSource={wasteRows}
              columns={wasteTableColumns}
              pagination={{
                defaultPageSize: 5,
                total: wasteRows.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
              }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No hay residuos aún"
                  />
                ),
              }}
            />
          )}
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

WasteListTable.propTypes = {
  wastes: propTypes.array.isRequired,
  loading: propTypes.bool.isRequired,
  editWaste: propTypes.func.isRequired,
  deleteWaste: propTypes.func.isRequired,
};

export default WasteListTable;
