import actions from '../actions';
import {
  getTips,
  createTip,
  updateTip,
  changeStateTip,
  cleanTipFormAction,
} from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
  },
}));

describe('tip actionCreator (Sprint 5 - HU-30, HU-32)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('HU-30: dispatches begin and success when administrator creates a tip and handles errors', async () => {
    const payload = {
      title: 'Separa los envases plásticos',
      description: 'Enjuaga y seca las botellas PET antes de entregarlas.',
    };

    const response = {
      data: {
        tip: {
          id: 3,
          title: 'Separa los envases plásticos',
          description: 'Enjuaga y seca las botellas PET antes de entregarlas.',
          is_active: true,
        },
      },
      message: 'Se ha creado el tip correctamente',
    };

    DataService.post.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await createTip(payload)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.createTipBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.createTipSuccess({
        data: response.data.tip,
        message: response.message,
      })
    );
    expect(DataService.post).toHaveBeenCalledWith(
      '/tips_web',
      payload,
      process.env.REACT_APP_API_TIP
    );

    DataService.post.mockResolvedValueOnce({ data: {} });
    await createTip(payload)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.createTipError('Error al crear tip'));

    DataService.post.mockRejectedValueOnce({});
    await createTip(payload)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.createTipError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('HU-32: dispatches begin and success when administrator updates a tip and handles errors', async () => {
    const values = {
      title: 'Tip actualizado',
      description: 'Nueva descripción del tip ecológico.',
    };

    const response = {
      data: {
        tip: {
          id: 3,
          title: 'Tip actualizado',
          description: 'Nueva descripción del tip ecológico.',
          is_active: true,
        },
      },
      message: 'Se ha actualizado el tip correctamente',
    };

    DataService.patch.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await updateTip(3, values)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.updateTipBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.updateTipSuccess({
        id: 3,
        data: response.data.tip,
        message: response.message,
      })
    );
    expect(DataService.patch).toHaveBeenCalledWith(
      '/3/tips_web',
      values,
      process.env.REACT_APP_API_TIP
    );

    DataService.patch.mockResolvedValueOnce({ data: {} });
    await updateTip(3, values)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.updateTipError('Error al actualizar un tip')
    );

    DataService.patch.mockRejectedValueOnce({});
    await updateTip(3, values)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.updateTipError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('HU-32: dispatches begin and success when administrator changes tip state and handles errors', async () => {
    const response = {
      data: {
        tip: {
          id: 3,
          title: 'Tip actualizado',
          is_active: false,
        },
        message: 'Cambio de estado correctamente',
      },
    };

    DataService.patch.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await changeStateTip(3)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.changeStateTipBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.changeStateTipSuccess({
        id: 3,
        data: response.data.tip,
        message: response.data.message,
      })
    );
    expect(DataService.patch).toHaveBeenCalledWith(
      '3/change_state_tips',
      {},
      process.env.REACT_APP_API_TIP
    );

    DataService.patch.mockResolvedValueOnce({ data: {} });
    await changeStateTip(3)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.changeStateTipError('Error al cambiar estado tip')
    );

    DataService.patch.mockRejectedValueOnce({});
    await changeStateTip(3)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.changeStateTipError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('fetches all tips for backoffice management, handles errors, and cleans form', async () => {
    const response = {
      data: {
        data: [{ id: 3, title: 'Separa los envases plásticos' }],
      },
    };

    DataService.get.mockResolvedValueOnce(response);
    const dispatch = jest.fn();

    await getTips()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getTipsBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getTipsSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith('/tips_web', process.env.REACT_APP_API_TIP);

    DataService.get.mockResolvedValueOnce({});
    await getTips()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.getTipsError('Error al obtener los tips'));

    DataService.get.mockRejectedValueOnce({});
    await getTips()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getTipsError('Error de servidor. Intenta de nuevo.')
    );

    cleanTipFormAction()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.cleanTipForm());
  });
});
