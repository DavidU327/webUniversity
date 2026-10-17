import actions from '../actions';
import {
  assignedCollector,
  initOrder,
  cancelOrder,
  getOrderDays,
  getOrders,
  finishOrder,
  clearOrder,
} from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';
import { openNotification } from '../../../utility/notification';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

jest.mock('../../../utility/notification', () => ({
  openNotification: jest.fn(),
}));

describe('order actionCreator (Sprint 3)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('HU-19: dispatches begin and success when assigning a collector to an order and handles errors', async () => {
    const response = {
      data: {
        success: true,
        message: 'Recolector asignado correctamente',
        data: { id: 10, collector: { id: 5 } },
      },
    };

    DataService.post.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await assignedCollector(10, 5)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.assignedOrderBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.assignedOrderSuccess(response.data));
    expect(DataService.post).toHaveBeenCalledWith(
      'orders/assign-collector',
      { order_id: 10, collector_id: 5 },
      process.env.REACT_APP_API_ORDER
    );
    expect(openNotification).toHaveBeenCalledWith('success', 'Listo', 'Recolector asignado');

    DataService.post.mockResolvedValueOnce({});
    await assignedCollector(10, 5)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.assignedOrderError('Error al asignar recolector')
    );

    DataService.post.mockRejectedValueOnce({});
    await assignedCollector(10, 5)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.assignedOrderError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('HU-20: dispatches begin and success when starting service for assigned orders and handles errors', async () => {
    const payload = { order_ids: [10, 11] };
    const response = {
      data: {
        success: true,
        message: 'Órdenes iniciadas correctamente',
        data: [{ id: 10 }, { id: 11 }],
      },
    };

    DataService.post.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await initOrder(payload)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.initOrderBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.initOrderSuccess(response.data));
    expect(DataService.post).toHaveBeenCalledWith(
      'orders/init',
      payload,
      process.env.REACT_APP_API_ORDER
    );

    DataService.post.mockResolvedValueOnce({});
    await initOrder(payload)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.initOrderError('Error al iniciar ordenes'));

    DataService.post.mockRejectedValueOnce({});
    await initOrder(payload)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.initOrderError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('HU-25: dispatches begin and success when canceling an order and handles errors', async () => {
    const response = {
      data: {
        success: true,
        message: 'Órdenes cancelada correctamente',
        data: { id: 10, state: { name: 'Cancelada' } },
      },
    };

    DataService.post.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await cancelOrder(10)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.cancelOrderBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.cancelOrderSuccess(response.data));
    expect(DataService.post).toHaveBeenCalledWith(
      'orders/cancel',
      { order_id: 10 },
      process.env.REACT_APP_API_ORDER
    );
    expect(openNotification).toHaveBeenCalledWith('success', 'Listo', 'Órden cancelada');

    DataService.post.mockResolvedValueOnce({});
    await cancelOrder(10)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.cancelOrderError('Error al cancelar órden'));

    DataService.post.mockRejectedValueOnce({});
    await cancelOrder(10)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.cancelOrderError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('fetches orders of the day, paginated orders, finishes order, and clears order state', async () => {
    const response = {
      data: {
        data: [{ id: 10, date: '2026-10-26' }],
      },
    };

    DataService.get.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await getOrderDays('2026-10-26')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getOrderDaysBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getOrderDaysSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith(
      '/orders/dashboard?date=2026-10-26',
      process.env.REACT_APP_API_ORDER
    );

    DataService.get.mockResolvedValueOnce({});
    await getOrderDays('2026-10-26')(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getOrderDaysError('Error al obtener las ordenes')
    );

    DataService.get.mockRejectedValueOnce({});
    await getOrderDays('2026-10-26')(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getOrderDaysError('Error de servidor. Intenta de nuevo.')
    );

    DataService.get.mockResolvedValueOnce(response);
    await getOrders(1)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.getOrdersSuccess(response.data));

    DataService.get.mockResolvedValueOnce({});
    await getOrders(1)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getOrdersError('Error al obtener las ordenes')
    );

    DataService.get.mockRejectedValueOnce({});
    await getOrders(1)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getOrdersError('Error de servidor. Intenta de nuevo.')
    );

    DataService.post.mockResolvedValueOnce({ data: { id: 10, state: 'Finalizada' } });
    await finishOrder({ order_id: 10 })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.finishOrderSuccess({ id: 10, state: 'Finalizada' })
    );

    DataService.post.mockResolvedValueOnce({});
    await finishOrder({ order_id: 10 })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.finishOrderError('Error al finalizar órden')
    );

    DataService.post.mockRejectedValueOnce({});
    await finishOrder({ order_id: 10 })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.finishOrderError('Error de servidor. Intenta de nuevo.')
    );

    await clearOrder()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.cleanOrder());
  });
});
