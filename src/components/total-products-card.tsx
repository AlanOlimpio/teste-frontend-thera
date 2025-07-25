"use client";
import { Box } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ProductInterfaceProps } from "@/interfaces/product";
export function TotalProductsCard({
  productList,
}: {
  productList: ProductInterfaceProps[];
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Produtos</CardTitle>
        <Box className="h-4 w-4   text-amber-500 dark:text-amber-500" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {productList.length}
        </span>
      </CardContent>
    </Card>
  );
}
