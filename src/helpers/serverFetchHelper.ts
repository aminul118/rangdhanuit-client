'use server';

import generateQueryUrl from '@/lib/generateQueryUrl';
import { getCookie } from '@/lib/jwt';

export type FetchOptions = RequestInit & {
  query?: Record<string, string>;
};

const serverFetchHelper = async <T>(
  endpoint: string,
  options: FetchOptions,
): Promise<T> => {
  const { headers, query, ...rest } = options;
  const url = generateQueryUrl(endpoint, query);

  const makeRequest = async () => {
    const accessToken = await getCookie('accessToken');

    const isFormData = rest.body instanceof FormData;

    return fetch(url, {
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(accessToken ? { 
          Cookie: `accessToken=${accessToken}`,
          Authorization: accessToken 
        } : {}),
        ...headers,
      },
      ...rest,
    });
  };

  const res = await makeRequest();
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data as T;
};

export default serverFetchHelper;
