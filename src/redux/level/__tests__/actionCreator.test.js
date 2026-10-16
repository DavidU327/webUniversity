import actions from '../actions';
import { createLevel } from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('createLevel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches begin and success when creating a level', async () => {
    const payload = { name: 'Nivel 1', order: 1 };
    const response = {
      data: {
        id: 3,
        name: 'Nivel 1',
        order: 1,
      },
    };

    DataService.post.mockResolvedValue(response);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();

    await createLevel(payload, onSuccess)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.createLevelBegin());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.createLevelSuccess(response.data));
    expect(DataService.post).toHaveBeenCalledWith('/levels', payload, process.env.REACT_APP_API_LEVEL);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
