// کلاینت HTTP پایه — مسئولیت واحد: ارتباط با شبکه (SRP)
const BASE_URL = "http://localhost:4000";

export async function httpGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`خطای شبکه: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
