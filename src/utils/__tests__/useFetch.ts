import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';

import { useFetch, API_URL } from 'utils/hooks';

enableFetchMocks();

describe('useFetch', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({}));
  });

  it('should return the data and the status must be resolved when the request is successful ', async () => {
    fetch.mockResponseOnce(JSON.stringify({ items: [] }));
    const { result, waitFor } = renderHook(() => useFetch('something'));

    expect(result.current.status).toBe('pending');

    await waitFor(() => result.current.status === 'resolved');

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/something`);
    expect(result.current.data).toEqual({ items: [] });
  });

  it('should call fetch just when the endpoint change', async () => {
    const { rerender, result, waitFor } = renderHook((endpoint = 'home') =>
      useFetch(endpoint as string)
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/home`);

    rerender();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/home`);

    rerender('about');

    await waitFor(() => result.current.status === 'resolved');

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/about`);

    rerender();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/about`);
  });

  it('should return an error and status rejected when response is not ok', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Not Found' }), {
      status: 404
    });

    const { result, waitFor, rerender } = renderHook((endpoint = 'endpoint') =>
      useFetch(endpoint as string)
    );

    expect(result.current.status).toBe('pending');
    await waitFor(() => result.current.status === 'rejected');
    expect(result.current.error).toBe('Not Found');

    fetch.mockResponseOnce(JSON.stringify({ message: 'Internal Error' }), {
      status: 500
    });

    rerender('another_render');
    expect(result.current.status).toBe('pending');
    await waitFor(() => result.current.status === 'rejected');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(result.current.error).toBe('Internal Error');
  });

  it('should return an error when the response is not a json', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue([]);

    const { result, waitFor } = renderHook(() => useFetch(''));

    await waitFor(() => result.current.status === 'rejected');

    expect(result.current.error).toMatchInlineSnapshot(
      `"Something went wrong."`
    );
  });

  it('should return an error if the request fails', async () => {
    fetch.mockRejectedValueOnce({ message: 'Some error' });

    const { result, waitFor } = renderHook(() => useFetch(''));

    await waitFor(() => result.current.status === 'rejected');
    expect(result.current.error).toBe('Some error');
  });
});
