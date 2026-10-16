import actions from '../actions';
import {
  getWastes,
  createWaste,
  updateWaste,
  toggleStatusWaste,
  deleteWaste,
} from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Waste Redux actionCreators (HU-15 Creación de tipos de residuo - Sprint 2)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('HU-15: dispatches begin and success when creating a waste type with points', async () => {
    const payload = { name: 'Cartón', points: 15, state: true };
    const response = {
      data: {
        message: 'Tipo de residuo creado correctamente',
        typeWaste: {
          id: 7,
          name: 'Cartón',
          points: 15,
          is_active: true,
        },
      },
    };

    DataService.post.mockResolvedValue(response);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();

    await createWaste(payload, onSuccess)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.createWasteBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.createWasteSuccess(response.data));
    expect(DataService.post).toHaveBeenCalledWith('/type-wastes', payload, process.env.REACT_APP_API_WASTE);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('HU-15: dispatches error when creating a duplicate waste type fails', async () => {
    const payload = { name: 'Cartón', points: 15 };
    DataService.post.mockRejectedValue({
      response: {
        data: {
          message: 'El tipo de residuo "Cartón" ya existe.',
        },
      },
    });
    const dispatch = jest.fn();

    await createWaste(payload)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.createWasteBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.createWasteError('El tipo de residuo "Cartón" ya existe.')
    );
  });

  it('HU-15: lists all waste types for the administrator module', async () => {
    const response = {
      data: {
        data: [
          { id: 1, name: 'Plástico PET', points: 15, is_active: true },
          { id: 2, name: 'Vidrio', points: 20, is_active: true },
        ],
      },
    };

    DataService.get.mockResolvedValue(response);
    const dispatch = jest.fn();

    await getWastes()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getWasteBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.getWasteSuccess(response.data));
    expect(DataService.get).toHaveBeenCalledWith('/type-wastes', process.env.REACT_APP_API_WASTE);
  });

  it('HU-15: updates an existing waste type and refreshes list', async () => {
    const payload = { name: 'Plástico PET Reciclable', points: 25 };
    const response = {
      data: {
        message: 'Tipo de residuo actualizado correctamente',
        typeWaste: { id: 1, name: 'Plástico PET Reciclable', points: 25, is_active: true },
      },
    };

    DataService.put.mockResolvedValue(response);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();

    await updateWaste(1, payload, onSuccess)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.updateWasteBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.updateWasteSuccess(response.data));
    expect(DataService.put).toHaveBeenCalledWith('/type-wastes/1', payload, process.env.REACT_APP_API_WASTE);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('HU-15: toggles waste type active status and refreshes list', async () => {
    const response = {
      data: {
        message: 'Estado actualizado correctamente',
        typeWaste: { id: 1, name: 'Plástico PET', points: 15, is_active: false },
      },
    };

    DataService.patch.mockResolvedValue(response);
    const dispatch = jest.fn();

    await toggleStatusWaste(1)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleStatusWasteBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.toggleStatusWasteSuccess(response.data));
    expect(DataService.patch).toHaveBeenCalledWith(
      '/type-wastes/1/toggle-status',
      {},
      process.env.REACT_APP_API_WASTE
    );
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('HU-15: deletes a waste type and refreshes list', async () => {
    DataService.delete.mockResolvedValue({ data: { message: 'Tipo de residuo eliminado correctamente' } });
    const dispatch = jest.fn();
    const onSuccess = jest.fn();

    await deleteWaste(1, onSuccess)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.deleteWasteBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.deleteWasteSuccess(1));
    expect(DataService.delete).toHaveBeenCalledWith('/type-wastes/1', {}, process.env.REACT_APP_API_WASTE);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
