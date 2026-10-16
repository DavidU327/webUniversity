import actions from '../actions';
import { createWaste } from '../actionCreator';
import { DataService } from '../../../config/dataService/dataService';

jest.mock('../../../config/dataService/dataService', () => ({
  DataService: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('createWaste', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches begin and success when creating a waste type', async () => {
    const payload = { name: 'Cartón', state: true };
    const response = {
      data: {
        id: 7,
        name: 'Cartón',
        state: true,
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
});
