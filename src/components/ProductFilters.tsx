// components/ProductFilters.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateQuery(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // volta pra página 1 ao filtrar
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="space-y-2">
      <input
        placeholder="Nome do produto"
        onChange={(e) => updateQuery("name", e.target.value)}
        defaultValue={searchParams.get("name") || ""}
        className="border p-2 w-full"
      />

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Preço mín."
          onChange={(e) => updateQuery("minPrice", e.target.value)}
          defaultValue={searchParams.get("minPrice") || ""}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Preço máx."
          onChange={(e) => updateQuery("maxPrice", e.target.value)}
          defaultValue={searchParams.get("maxPrice") || ""}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
