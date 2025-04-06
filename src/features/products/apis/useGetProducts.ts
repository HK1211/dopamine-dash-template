
import { useQuery } from "@tanstack/react-query";

export function useGetProducts(queryParams, options = {}) {
  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const url = new URL("/api/products", window.location.origin);
      Object.entries(queryParams || {}).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("API 호출 실패");
      return res.json();
    },
    ...options
  });
}
