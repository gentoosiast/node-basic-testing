import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({});

    await throttledGetDataFromApi('todos');

    jest.runAllTimers();

    expect(axiosCreateSpy.mock.calls[0]?.[0]).toStrictEqual({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativeURL = 'todos';
    const axiosGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({});

    await throttledGetDataFromApi(relativeURL);

    jest.runAllTimers();

    expect(axiosGetSpy.mock.calls[0]?.[0]).toBe(relativeURL);
  });

  test('should return response data', async () => {
    const relativeURL = 'todos';
    const responseData = [
      {
        userId: 5,
        id: 98,
        title:
          'debitis accusantium ut quo facilis nihil quis sapiente necessitatibus',
        completed: true,
      },
      {
        userId: 5,
        id: 99,
        title: 'neque voluptates ratione',
        completed: false,
      },
    ];
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: responseData });

    const result = await throttledGetDataFromApi(relativeURL);

    jest.runAllTimers();

    expect(result).toStrictEqual(responseData);
  });
});
