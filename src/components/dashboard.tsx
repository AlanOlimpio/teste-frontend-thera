"use client";
import { useEffect } from "react";
import { ProgressChart } from "./product-chart";
import { TotalProductsCard } from "./total-products-card";
import { useProductStore } from "@/stores/useProductStore";

export default function Dashboard() {
  const { productList, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight pt-7">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
        <TotalProductsCard productList={productList} />
      </div>
      <div className="grid grid-cols-9 gap-4 max-sm:grid-cols-1">
        <ProgressChart productList={productList} />
      </div>
    </main>
  );
}
