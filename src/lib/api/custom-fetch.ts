export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5400';

export const customFetch = <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${BACKEND_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }).then(async (response) => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw error;
    }
    return response.json();
  });
};
