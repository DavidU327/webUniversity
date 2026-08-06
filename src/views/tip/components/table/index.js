import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { ColumnLarge, TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';
import { StatusText } from '../../../collector/components/table/style';

function TipListTable({ editTip, deleteTip, morePage }) {

  const { tips, loading } = useSelector((state) => state.tip);

  const tableTips = tips.map((user) => {
    const { id, title, description, is_active: active } = user;

    return {
      key: id,
      title: <ColumnLarge >
        {title}
      </ColumnLarge>,
      description:
        <ColumnLarge>
          {description}
        </ColumnLarge>,
      status: <StatusText $color={active ? '#28A745' : '#6C757D'}>{active ? 'Habilitado' : 'Inhabilitado'}</StatusText>,
      change_state: <Switch defaultChecked size="large" />,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon"
                    type="info"
                    onClick={() => editTip('Editar tip', 'Editar')}
                    shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon"
                    onClick={deleteTip}
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
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      width: 60,
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      align: 'center',
    },
    {
      title: 'Cambiar estado',
      dataIndex: 'change_state',
      key: 'change_state',
      align: 'center',
      width: 70,
    },
    {
      title: 'Acciones',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 50,
    },
  ];

  return (
    <Cards headless>
      <TableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={tableTips}
            columns={collectorTableColumns}
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              total: tips.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            }}
            onChange={(pagination) => {
              const { current} = pagination;
              morePage(current)
            }}
            locale={{ emptyText: <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay tips aún" /> }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

TipListTable.propTypes = {
  editTip: propTypes.func.isRequired,
  deleteTip: propTypes.func.isRequired,
  morePage: propTypes.func.isRequired,
};

export default TipListTable;
