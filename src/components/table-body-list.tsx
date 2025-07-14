"use client";
import { toast } from "sonner";

import { TableBody } from "./ui/table";
import { ProductTableRow } from "./product-table-row";
import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { useSearchParams } from "next/navigation";
export function TableBodyList() {
  const { productList, fetchProducts } = useProductStore();
  const searchParams = useSearchParams();

  async function handleProductsList() {
    try {
      fetchProducts();
      toast.success("Produto criado com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o produto!");
      throw new Error("Ocorreu um erro ao criar o produto!");
    }
  }
  useEffect(() => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    fetchProducts(paramsObj);
  }, [searchParams.toString()]);

  useEffect(() => {
    const onCustomEvent = () => {
      handleProductsList();
    };

    window.addEventListener("myCustomEvent", onCustomEvent);

    return () => {
      window.removeEventListener("myCustomEvent", onCustomEvent);
    };
  }, []);

  return (
    <>
      <TableBody>
        {productList.map((product) => {
          return (
            <ProductTableRow
              product={product}
              key={`identifier${product.id}`}
            />
          );
        })}
      </TableBody>
    </>
  );
}
