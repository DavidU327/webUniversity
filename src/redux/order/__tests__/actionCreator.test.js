import actions from '../actions';
import { assignedCollector, initOrder, cancelOrder, getOrderDays } from '../actionCreator';
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

  it('HU-19: dispatches begin and success when assigning a collector to an order', async () => {
    const response = {
      data: {
        success: true,
        message: 'Recolector asignado correctamente',
        data: { id: 10, collector: { id: 5 } },
      },
    };

    DataService.post.mockResolvedValue(response);
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
  });

  it('HU-20: dispatches begin and success when starting service for assigned orders', async () => {
    const payload = { order_ids: [10, 11] };
    const response = {
      data: {
        success: true,
        message: 'Órdenes iniciadas correctamente',
        data: [{ id: 10 }, { id: 11 }],
      },
    };

    DataService.post.mockResolvedValue(response);
    const dispatch = jest.fn();

    await initOrder(payload)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.initOrderBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.initOrderSuccess(response.data));
    expect(DataService.post).toHaveBeenCalledWith(
      'orders/init',
      payload,
      process.env.REACT_APP_API_ORDER
    );
  });

  it('HU-25: dispatches begin and success when canceling an order', async () => {
    const response = {
      data: {
        success: true,
        message: 'Órdenes cancelada correctamente',
        data: { id: 10, state: { name: 'Cancelada' } },
      },
    };

    DataService.post.mockResolvedValue(response);
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
  });

  it('fetches orders of the day for dashboard management', async () => {
    const response = {
      data: {
        data: [{ id: 10, date: '2026-10-26' }],
      },
    };

    DataService.get.mockResolvedValue(response);
    const dispatch = jest.fn();

    await getOrderDays('2026-10-26')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getOrderDaysBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getOrderDaysSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith(
      '/orders/dashboard?date=2026-10-26',
      process.env.REACT_APP_API_ORDER
    );
  });
});

