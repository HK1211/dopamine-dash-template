import { useQuery } from "@tanstack/react-query"

export function useGetProducts(filters: Record<string, string>) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/products?${query}`);
      return res.json();
    },
  });
}