module.exports = function renderQueryHook(meta) {
  const name = meta.name;
  const pascal = name.charAt(0).toUpperCase() + name.slice(1);
  const baseUrl = meta.api.baseUrl;

  return `
import { useQuery } from "@tanstack/react-query";

export function useGet${pascal}(queryParams, options = {}) {
  return useQuery({
    queryKey: ["${name}", queryParams],
    queryFn: async () => {
      const url = new URL("${baseUrl}", window.location.origin);
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
`;
};