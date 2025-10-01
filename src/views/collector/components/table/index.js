import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Empty, Select, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { StatusText, TableStyleWrapper } from './style';
import { TableWrapper } from '../../../styled';
import Heading from '../../../../components/heading';
import { Cards } from '../../../../components/cards';
import { Button } from '../../../../components/buttons';

const { Option } = Select;

function CollectorListTable({
                              editCollector,
                              deleteCollector,
                              modalDocument,
                              modalChangeState,
                              changeState
}) {

  const {
    recollectors,
    loading,
    states,
  } = useSelector((state) => state.recollector);

  const infoDocument = (url, type, collector) => {
    if(url !== null){
      window.open(url, "_blank");
    }else{
      modalDocument(type, collector);
    }
  };

  const collectors = recollectors.map((recollector) => {
    const {
      collector: {
        id,
        user: {
          name,
          image,
          identification,
          email,
          phone,
          type_identification: typeIdentification,
        },
        identification_document: identificationDocument,
        driving_license_document: drivingLicenseDocument,
        state,
      },
    } = recollector;
    return {
      key: id,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '80px', height: '80px', borderRadius: '10px' }} src={image} alt="" />
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
      document_identification: (
        <div>
          <Button
                  type="primary"
                  onClick={() => infoDocument(identificationDocument, 'document_identification', recollector)}
                  shape="circle">
            <FeatherIcon icon={identificationDocument !== null ? 'eye' : 'upload'} size={16} />
          {identificationDocument !== null ? 'Documento de identidad' : 'No cargo el documento'}
          </Button>
        </div>
      ),
      document_driving:
        (
          <div>
            <Button
              type="primary"
              onClick={() => infoDocument(drivingLicenseDocument, 'document_driving_license', recollector)}
              shape="circle">
              <FeatherIcon icon={drivingLicenseDocument !== null ? 'eye' : 'upload'} size={16} />
              {drivingLicenseDocument !== null ? 'Licencia de conducción' : 'No cargo el documento'}
            </Button>
          </div>
        ),
      status: <StatusText $color={state?.color}>{state?.name}</StatusText>,
      change_state: (
        <>
          {state?.name === 'Pendiente de Validar' &&
            <Select style={{ width: '100%' }}
                    onChange={(value) => {
                      const selectedState = states.find(s => s.id === value);
                      modalChangeState(recollector, selectedState);
                    }}
            >
              {states.map((state) => (
                <Option key={state.id} value={state.id}>{state.name}</Option>
              ))}
            </Select>
          }
          {state?.name !== 'Rechazado' && (
            <Switch checked={state?.name === 'Habilitado'} size="large" onChange={() => changeState(id)} />
          )}
        </>
      ),
      action: (
        <div className="table-actions">
          <>
          {state?.name !== 'Rechazado' && (
            <Button className="btn-icon"
                    type="info"
                    onClick={() => editCollector('Editar recolector', 'Editar', recollector)}
                    shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
          )}
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
      title: 'Documento de identificación',
      dataIndex: 'document_identification',
      key: 'document_identification',
      align: 'center',
    },
    {
      title: 'Documento de conducción',
      dataIndex: 'document_driving',
      key: 'document_driving',
      align: 'center',
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
            rowKey={(record) => record.key}
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
  modalDocument: propTypes.func.isRequired,
  modalChangeState: propTypes.func.isRequired,
  changeState: propTypes.func.isRequired,
};

export default CollectorListTable;
