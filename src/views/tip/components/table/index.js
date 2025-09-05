import React from 'react';
import propTypes from 'prop-types';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { ColumnLarge, TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function TipListTable({ editTip, deleteTip }) {

  const allTips = [{id: 1, status: 'active'}];

  const tips = allTips.map((user) => {
    const { id, status } = user;

    return {
      key: id,
      title: <ColumnLarge >
        Tip 1
      </ColumnLarge>,
      description:
        <ColumnLarge>
          lorjkewjdjskalkjdjaksbdjlasdsadhjasdadasdasdsadasdasddasdasdasadldkajsdkasñkdakhldjlasjñkldjhkajsñdhaskljñdahslkjldlasda
        </ColumnLarge>,
      status: <span className={`status-text ${status}`}>Active</span>,
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
            dataSource={tips}
            columns={collectorTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: tips.length,
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

TipListTable.propTypes = {
  editTip: propTypes.func.isRequired,
  deleteTip: propTypes.func.isRequired,
};

export default TipListTable;
