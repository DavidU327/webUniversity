import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { ListOrderFinish } from './style';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/buttons';

function ModalFinishOrder({ visible, onCancel, order, loading, confirmFinishOrder }) {

  const { wastes } = useSelector((state) => state.waste);

  const [newWastes, setNewWastes] = useState(
    order.type_waste.map(waste => ({
      ...waste,
      approved: false,
      edit: false,
      error: null,
    }))
  );

  const handleApprovedOrCancel = (wasteId) => {
    setNewWastes(prev =>
      prev.map(waste =>
        waste.id === wasteId
          ? { ...waste, approved:
              !waste.approved,
              edit: false,
              weight: waste.weight === '' ? 0 : waste.weight,
              points: waste.weight === '' ? 0 : waste.points,
          }
          : waste
      )
    );
  }

  const handleEdit = (wasteId) => {
    setNewWastes(prev =>
      prev.map(waste =>
        waste.id === wasteId
          ? { ...waste, edit: true }
          : waste
      )
    );
  }

  const handleCancelEdit = (wasteId) => {
    setNewWastes(prev =>
      prev.map(waste =>
        waste.id === wasteId
          ? { ...waste,
            approved: false,
            edit: false,
            weight: waste.weight === '' ? 0 : waste.weight,
            points: waste.weight === '' ? 0 : waste.points,
          }
          : waste
      )
    );
  }

  const handleWeightChange = (wasteId, wasteName, value) => {
    setNewWastes(prev =>
      prev.map(waste => {
        if (waste.id !== wasteId) {
          return waste;
        }

        const weight = Number(value);
        const findWest = wastes.find((item) => item.name === wasteName);

        if (value === '') {
          return {
            ...waste,
            weight: value,
            error: 'El peso es requerido',
          };
        }

        if (Number.isNaN(weight)) {
          return {
            ...waste,
            weight: value,
            error: 'Debe ingresar un número válido',
          };
        }

        if (weight < 0) {
          return {
            ...waste,
            weight: value,
            error: 'El peso no puede ser negativo',
          };
        }

        return {
          ...waste,
          weight,
          points: findWest.points * weight,
          error: null,
        };
      })
    );
  };

  const handleCancel = () => {
    onCancel();
  };


  return (
    <Modal
      type="primary"
      title="Finalizar Órden"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button size="default" type="success" onClick={() => confirmFinishOrder(newWastes)} loading={loading}>
          Finalizar
        </Button>
      ]}
    >
      <div>
        <span>Se va a finalizar la Órden {order.id}, revisar cada residuo si el peso corresponde con los indicado por el usuario y finalizar</span>
      </div>
      <ListOrderFinish >

        <div className="waste-table">
          <div className="header">
            <span>Residuo</span>
            <span className="points">Puntos</span>
            <span className="weight">Peso</span>
            <span className="weight">Acciones</span>
          </div>

          {newWastes.map((waste) => (
            <div className="row" key={waste.id}>
              <span>{waste.name}</span>
              <span className="points">{waste.points}</span>
              <span className="weight">
                {waste.edit ? (
                    <div className="weight-edit">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={waste.weight}
                        onChange={(e) =>
                          handleWeightChange(waste.id, waste.name, e.target.value)
                        }
                      />

                      {waste.error && (
                        <div className="error-text">
                          {waste.error}
                        </div>
                      )}
                    </div>
                  )
                  : (`${waste.weight} kg`)
                }
        </span>
              <div className="icon">
                {!waste.approved && !waste.edit && (
                  <Button className="btn-icon"
                          onClick={() => handleEdit(waste.id)}
                          type="info"
                          shape="circle">
                    <FeatherIcon icon="edit" size={16} />
                  </Button>
                )}
                {waste.edit && (
                  <Button className="btn-icon"
                          onClick={() => handleCancelEdit(waste.id)}
                          type="info"
                          shape="circle">
                    <FeatherIcon icon='x-circle' size={16} />
                  </Button>
                )}
                <Button className="btn-icon"
                        onClick={() => handleApprovedOrCancel(waste.id)}
                        type="info"
                        shape="circle">
                  <FeatherIcon icon={waste.approved ? 'x-circle' : 'check-circle'} size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ListOrderFinish>
    </Modal>
  );
}

ModalFinishOrder.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  order: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  confirmFinishOrder: propTypes.func.isRequired,
};

export default ModalFinishOrder;
