import React from 'react';

export const API_URL = 'https://api.openbrewerydb.org';

type Status = 'pending' | 'rejected' | 'resolved';

export function useFetch<TData = unknown>(endpoint: string) {
  const [data, setData] = React.useState<TData>();
  const [status, setStatus] = React.useState<Status>('pending');
  const [error, setError] = React.useState<string | null>(null);

  React.useLayoutEffect(() => {
    setStatus('pending');

    api(`${API_URL}/${endpoint}`).then(
      (data) => {
        setData(data);
        setStatus('resolved');
      },
      (error) => {
        setError(error.message);
        setStatus('rejected');
      }
    );
  }, [endpoint]);

  return { status, data, error };
}

async function api(url: string) {
  try {
    const response = await fetch(url);

    const data = response.json ? await response.json() : response;

    // have some errors where the API send an array as a response
    const isAValidError = !response.ok && response.json;

    if (response.ok) {
      return data;
    }

    if (isAValidError) {
      return Promise.reject(data);
    }

    return Promise.reject({ message: 'Something went wrong.' });
  } catch (error) {
    return Promise.reject(error);
  }
}
