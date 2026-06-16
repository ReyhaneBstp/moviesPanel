const BASE_URL = "/api";

export async function httpGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`خطای شبکه: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function httpPatch<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`خطای شبکه: ${response.status}`);
  return response.json() as Promise<T>;
}