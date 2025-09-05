import React from 'react';
import propTypes from 'prop-types';
import { Empty, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { ColumnLarge, TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

function BlogListTable({ editBlog, deleteBlog }) {

  const allBlogs = [{id: 1, status: 'active'}];

  const blogs = allBlogs.map((user) => {
    const { id, status } = user;

    return {
      key: id,
      title: <ColumnLarge >
        Blog de medio ambiente
      </ColumnLarge>,
      description:
        <ColumnLarge>
          lorjkewjdjskalkjdjaksbdjlasdsadhjasdadasdasdsadasdasddasdasdasadldkajsdkasñkdakhldjlasjñkldjhkajsñdhaskljñdahslkjldlasda
        </ColumnLarge>,
      url: 'http://google.com',
      image: (
        <figure>
          <img style={{ width: '120px', height: '120px' }}
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEBkw2FR-UGWNB96Ip7cD5m3cJkQ_HyYuqKg&s"
               alt="" />
        </figure>
      ),
      status: <span className={`status-text ${status}`}>Active</span>,
      change_state: <Switch defaultChecked size="large" />,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon"
                    type="info"
                    onClick={() => editBlog('Editar blog', 'Editar')}
                    shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon"
                    onClick={deleteBlog}
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
      width: 150,
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      width: 180,
      ellipsis: true,
    },
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      width: 180,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
    {
      title: 'Cambiar estado',
      dataIndex: 'change_state',
      key: 'change_state',
      align: 'center',
      width: 140,
    },
    {
      title: 'Acciones',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 120,
    },
  ];

  return (
    <Cards headless>
      <TableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={blogs}
            columns={collectorTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: blogs.length,
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

BlogListTable.propTypes = {
  editBlog: propTypes.func.isRequired,
  deleteBlog: propTypes.func.isRequired,
};

export default BlogListTable;
