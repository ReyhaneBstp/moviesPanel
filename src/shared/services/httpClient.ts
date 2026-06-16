const BASE_URL = "/api";
import { useGlobalStore } from "@/shared/store/useGlobalStore";

function getErrorMessage(response: Response): string {
  return `خطا در دریافت اطلاعات (${response.status})`;
}

export async function httpGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    const errorMessage = getErrorMessage(response);
    useGlobalStore.getState().showSnackbar(errorMessage, 'error');
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export async function httpPatch<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!response.ok) {
    const errorMessage = getErrorMessage(response);
    useGlobalStore.getState().showSnackbar(errorMessage, 'error');
    throw new Error(errorMessage);
  }
  
  return response.json() as Promise<T>;
}

export async function httpPost<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!response.ok) {
    const errorMessage = getErrorMessage(response);
    useGlobalStore.getState().showSnackbar(errorMessage, 'error');
    throw new Error(errorMessage);
  }
  
  return response.json() as Promise<T>;
}

export async function httpDelete<T>(endpoint: string, body?: any): Promise<T> {
  const options: RequestInit = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorMessage = getErrorMessage(response);
    useGlobalStore.getState().showSnackbar(errorMessage, 'error');
    throw new Error(errorMessage);
  }
  
  return response.json() as Promise<T>;
}
