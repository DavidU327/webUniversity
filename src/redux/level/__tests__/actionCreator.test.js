import actions from '../actions';
import {
  getLevels,
  createLevel,
  updateLevel,
  selectLevel,
  cleanLevelFormAction,
} from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe('level actionCreators (Sprint 2 - HU-16)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lists levels and handles empty or error responses', async () => {
    const dispatch = jest.fn();
    DataService.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Semilla Verde' }] });

    await getLevels()(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getLevelBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.getLevelSuccess([{ id: 1, name: 'Semilla Verde' }])
    );

    DataService.get.mockResolvedValueOnce({});
    await getLevels()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.getLevelError('Error al obtener los niveles'));

    DataService.get.mockRejectedValueOnce({});
    await getLevels()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.getLevelError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('dispatches begin and success when creating a level and handles errors', async () => {
    const payload = { name: 'Nivel 1', order: 1 };
    const response = {
      data: {
        id: 3,
        name: 'Nivel 1',
        order: 1,
      },
    };

    DataService.post.mockResolvedValueOnce(response);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();

    await createLevel(payload, onSuccess)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.createLevelBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.createLevelSuccess(response.data));
    expect(DataService.post).toHaveBeenCalledWith(
      '/levels',
      payload,
      process.env.REACT_APP_API_LEVEL
    );
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));

    DataService.post.mockResolvedValueOnce({});
    await createLevel(payload)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.createLevelError('Error al crear el nivel'));

    DataService.post.mockRejectedValueOnce({});
    await createLevel(payload)(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.createLevelError('Error de servidor. Intenta de nuevo.')
    );
  });

  it('updates a level, selects a level, and cleans level form', async () => {
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    DataService.put.mockResolvedValueOnce({ data: { id: 1, name: 'Nivel Actualizado' } });

    await updateLevel(1, { name: 'Nivel Actualizado' }, onSuccess)(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.updateLevelBegin());
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      actions.updateLevelSuccess({ id: 1, name: 'Nivel Actualizado' })
    );
    expect(onSuccess).toHaveBeenCalledTimes(1);

    DataService.put.mockResolvedValueOnce({});
    await updateLevel(1, { name: 'Nivel Actualizado' })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.updateLevelError('Error al actualizar el nivel')
    );

    DataService.put.mockRejectedValueOnce({});
    await updateLevel(1, { name: 'Nivel Actualizado' })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(
      actions.updateLevelError('Error de servidor. Intenta de nuevo.')
    );

    selectLevel({ id: 1, name: 'Semilla' })(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.setSelectedLevel({ id: 1, name: 'Semilla' }));

    cleanLevelFormAction()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(actions.cleanLevelForm());
  });
});
