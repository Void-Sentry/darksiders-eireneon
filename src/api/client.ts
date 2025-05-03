const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function http<T>(url: string, options?: RequestInit, onError?: any): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options?.headers || {})
    }
  });

  if (!res.ok) {
    const err = await res.text();
    onError?.();
    throw new Error(err || 'Request failed');
  }

  return res.json();
}
