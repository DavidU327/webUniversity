import actions from '../actions';
import { getTips, createTip, updateTip, changeStateTip } from '../actionCreator';
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

  it('HU-30: dispatches begin and success when administrator creates a tip', async () => {
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

    DataService.post.mockResolvedValue(response);
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
  });

  it('HU-32: dispatches begin and success when administrator updates a tip', async () => {
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

    DataService.patch.mockResolvedValue(response);
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
  });

  it('HU-32: dispatches begin and success when administrator changes tip state', async () => {
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

    DataService.patch.mockResolvedValue(response);
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
  });

  it('fetches all tips for backoffice management', async () => {
    const response = {
      data: {
        data: [{ id: 3, title: 'Separa los envases plásticos' }],
      },
    };

    DataService.get.mockResolvedValue(response);
    const dispatch = jest.fn();

    await getTips()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getTipsBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getTipsSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith('/tips_web', process.env.REACT_APP_API_TIP);
  });
});

