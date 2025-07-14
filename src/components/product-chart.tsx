"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMemo } from "react";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { ProductInterfaceProps } from "@/interfaces/product";

export function ProgressChart({
  productList,
}: {
  productList: ProductInterfaceProps[];
}) {
  const productListFormatter = useMemo(() => {
    return productList?.map((product) => {
      return {
        createdAt: dateFormatter.format(new Date(product.createdAt!)),
        price: product.price,
      };
    });
  }, [productList]);

  return (
    <Card className="col-span-12">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Valor de Produtos
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={248}>
          <LineChart data={productListFormatter} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="createdAt"
              axisLine={false}
              tickLine={false}
              dy={16}
            />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) => priceFormatter.format(value)}
              dx={-10}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line
              stroke={colors.violet[500]}
              type="linear"
              strokeWidth={2}
              dataKey="price"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
