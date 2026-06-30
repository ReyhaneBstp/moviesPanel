const BASE_URL = "/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `خطا (${response.status})`;

      try {
        const error = await response.json();

        if (typeof error === "string") {
          errorMessage = error;
        } else if (error?.message) {
          errorMessage = error.message;
        }
      } catch {
        console.error("its not a json response")
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return (await response.json()) as T;
    }

    return (await response.text()) as T;
  } catch (error) {

    throw error;
  }
}

export function httpGet<T>(endpoint: string) {
  return request<T>(endpoint);
}

export function httpPost<T, B = unknown>(
  endpoint: string,
  body: B
) {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function httpPatch<T, B = unknown>(
  endpoint: string,
  body: B
) {
  return request<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function httpDelete<T>(
  endpoint: string,
  body?: unknown
) {
  return request<T>(endpoint, {
    method: "DELETE",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });
}