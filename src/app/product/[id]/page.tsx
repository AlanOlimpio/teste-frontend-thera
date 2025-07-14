import { ProductInterfaceProps } from "@/interfaces/product";
import { api } from "@/lib/axios";
import { categorysMap } from "@/utils/categorysMap";
import Image from "next/image";

export default async function productDetails({
  params,
}: {
  params: ProductInterfaceProps;
}) {
  const { id } = await params;

  const product: ProductInterfaceProps = await api
    .post("/api/product/", {
      id: id,
    })
    .then((response) => response.data);

  return (
    <main className="flex flex-col gap-4 pt-7">
      <div className="grid gap-4 content-start">
        <h1 className="text-2xl font-bold tracking-normal my-5">
          Produto:{" "}
          <span className="text-muted-foreground font-normal">
            {product.name}
          </span>
        </h1>
      </div>

      <div className="grid gap-16 grid-cols-2 max-sm:grid-cols-1">
        {product.imageUrl && (
          <Image
            width={500}
            height={500}
            src={product.imageUrl}
            alt={product.name}
            className="object-cover rounded-md"
          />
        )}

        <div className="grid gap-4">
          <div>
            <p className="font-bold tracking-normal">
              Descrição:{" "}
              <span className="text-muted-foreground font-normal">
                {product.description}
              </span>
            </p>
          </div>
          <div>
            <p className="font-bold tracking-normal">
              Categoria:{" "}
              <span className="text-muted-foreground font-normal">
                {categorysMap.map((category) => {
                  if (category.value === product.category) {
                    return category.label;
                  }
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
