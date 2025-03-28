module.exports = function renderQueryHook(meta) {
  const name = meta.name;
  const pascal = name.charAt(0).toUpperCase() + name.slice(1);
  const baseUrl = meta.api?.baseUrl;

  return `
import { useQuery } from "@tanstack/react-query"

export function useGet${pascal}(filters: Record<string, string>) {
  return useQuery({
    queryKey: ["${name}", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(\`${baseUrl}?\${query}\`);
      return res.json();
    },
  });
}
`.trim();
};