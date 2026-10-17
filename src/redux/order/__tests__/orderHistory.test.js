import actions from '../actions';
import {
  getOrders,
  getOrderDays,
  assignedCollector,
  initOrder,
  cancelOrder,
  finishOrder,
  clearOrder,
} from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

jest.mock('../../../utility/notification', () => ({
  openNotification: jest.fn(),
}));

describe('order history actionCreator (Sprint 4 - HU-28)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('HU-28: dispatches begin and success when administrator fetches all created orders paginated', async () => {
    const response = {
      data: {
        data: [
          {
            id: 40,
            date: '2026-10-26',
            user: { id: 10, name: 'Maria Lopez' },
            collector: { id: 5, name: 'Carlos Recolector' },
            state: { id: 5, name: 'Orden finalizada', color: 'green' },
          },
          {
            id: 39,
            date: '2026-10-25',
            user: { id: 11, name: 'Pedro Gomez' },
            collector: null,
            state: { id: 1, name: 'Creación de orden', color: 'blue' },
          },
        ],
        meta: {
          current_page: 1,
          total: 2,
        },
      },
    };

    DataService.get.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await getOrders(1)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getOrdersBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getOrdersSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith(
      '/orders?page=1&limit=10',
      process.env.REACT_APP_API_ORDER
    );

    DataService.get.mockResolvedValueOnce({});
    await getOrders(1)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getOrdersError('Error al obtener las ordenes')
    );
  });

  it('HU-28: dispatches error when fetching administrator orders fails', async () => {
    DataService.get.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error al consultar el historial de órdenes',
        },
      },
    });
    const dispatch = jest.fn();

    await getOrders(1)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getOrdersBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.getOrdersError('Error al consultar el historial de órdenes')
    );

    DataService.get.mockRejectedValueOnce({});
    await getOrders(1)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getOrdersError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('HU-28: fetches orders filtered by day and exercises order lifecycle actions', async () => {
    const response = {
      data: {
        data: [{ id: 40, date: '2026-10-26' }],
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

    DataService.post.mockResolvedValueOnce({ data: { id: 40 } });
    await assignedCollector(40, 5)(dispatch);
    DataService.post.mockResolvedValueOnce({});
    await assignedCollector(40, 5)(dispatch);
    DataService.post.mockRejectedValueOnce({});
    await assignedCollector(40, 5)(dispatch);

    DataService.post.mockResolvedValueOnce({ data: [{ id: 40 }] });
    await initOrder({ order_ids: [40] })(dispatch);
    DataService.post.mockResolvedValueOnce({});
    await initOrder({ order_ids: [40] })(dispatch);
    DataService.post.mockRejectedValueOnce({});
    await initOrder({ order_ids: [40] })(dispatch);

    DataService.post.mockResolvedValueOnce({ data: { id: 40 } });
    await cancelOrder(40)(dispatch);
    DataService.post.mockResolvedValueOnce({});
    await cancelOrder(40)(dispatch);
    DataService.post.mockRejectedValueOnce({});
    await cancelOrder(40)(dispatch);

    DataService.post.mockResolvedValueOnce({ data: { id: 40 } });
    await finishOrder({ order_id: 40 })(dispatch);
    DataService.post.mockResolvedValueOnce({});
    await finishOrder({ order_id: 40 })(dispatch);
    DataService.post.mockRejectedValueOnce({});
    await finishOrder({ order_id: 40 })(dispatch);

    await clearOrder()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.cleanOrder());
  });
});
