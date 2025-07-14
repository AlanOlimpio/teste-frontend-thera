"use client";

import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";

import { ProductInterfaceProps } from "@/interfaces/product";

import Image from "next/image";
import { categorysMap } from "@/utils/categorysMap";
import { priceFormatter } from "@/utils/formatter";

export function ProductTableRow({
  product,
}: {
  product: ProductInterfaceProps;
}) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/product/${product.id}`)}
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <TableCell className="font-mono text-xs font-medium min-w-[90px]">
        {product.imageUrl ? (
          <Image
            width={80}
            height={80}
            src={product.imageUrl}
            alt={product.name}
            className="h-20 w-20 object-cover  rounded-md"
          />
        ) : (
          <div className="w-20 p-2  h-20 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Sem imagem</span>
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell className="font-medium">
        {categorysMap.map((category) => {
          if (category.value === product.category) {
            return category.label;
          }
        })}
      </TableCell>
      <TableCell>{priceFormatter.format(product.price)}</TableCell>
      <TableCell className="font-medium">
        {product.description?.substring(0, 50) || "Sem descrição"}
      </TableCell>
    </TableRow>
  );
}
