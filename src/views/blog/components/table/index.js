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


function BlogListTable({ editBlog, deleteBlog, morePage }) {
  const { blogs, loading } = useSelector((state) => state.blog);


  const tableBlogs = blogs.map((blog) => {
    const { id, title, description, url, image, is_active: active } = blog;

    return {
      key: id,
      title: <ColumnLarge >
        {title}
      </ColumnLarge>,
      description:
        <ColumnLarge>
          {description}
        </ColumnLarge>,
      url: <ColumnLarge>
        {url}
      </ColumnLarge>,
      image: (
        <figure>
          <img style={{ width: '120px', height: '120px' }}
               src={image}
               alt="" />
        </figure>
      ),
      status: <StatusText $color={active ? '#28A745' : '#6C757D'}>{active ? 'Habilitado' : 'Inhabilitado'}</StatusText>,
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

  const blogTableColumns = [
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
      width: 100,
    },
  ];

  return (
    <Cards headless>
      <TableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowKey={(record) => record.key}
            dataSource={tableBlogs}
            columns={blogTableColumns}
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              total: blogs.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            }}
            onChange={(pagination) => {
              const { current} = pagination;
              morePage(current)
            }}
            locale={{ emptyText: <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay blogs aún" /> }}
          />
        </TableWrapper>
      </TableStyleWrapper>
    </Cards>
  );
}

BlogListTable.propTypes = {
  editBlog: propTypes.func.isRequired,
  deleteBlog: propTypes.func.isRequired,
  morePage:  propTypes.func.isRequired,
};

export default BlogListTable;
