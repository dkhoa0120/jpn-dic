/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildQueryParams(query: Partial<any>): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    params.append(key, String(value));
  });

  return params;
}
