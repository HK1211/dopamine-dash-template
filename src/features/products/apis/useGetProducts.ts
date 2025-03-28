import { useQuery } from "@tanstack/react-query"

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products")
      return res.json()
    },
  });
}