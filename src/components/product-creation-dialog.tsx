"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";
import { priceParseFloat } from "@/utils/formatter";
import { BaseDialogProps, Dialog } from "./ui/dialog";
import { DialogClose, DialogFooter } from "./ui/dialog/primitive";
import { useState } from "react";
import { categorysMap } from "@/utils/categorysMap";

const productCreationSchema = z.object({
  name: z.string().min(3, {
    message: "Isto é obrigatório, deve conter pelo menos 3 caracteres!",
  }),
  category: z.string({
    required_error: "Selecione uma categoria!",
  }),
  price: z
    .string({ message: "Campo Obrigatório!" })
    .min(1, { message: "Informe um valor!" }),
  description: z.string().min(10, {
    message: "Isto é obrigatório, deve conter pelo menos 10 caracteres!",
  }),
  image: z
    .any()
    .refine((file) => file?.[0] instanceof File, {
      message: "Imagem é obrigatória.",
    })
    .refine((files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type), {
      message: "Tipo de imagem inválido. Só aceitamos JPEG ou PNG.",
    })
    .refine((file) => file?.[0]?.size < 5 * 1024 * 1024, {
      message: "A imagem deve ter menos de 5MB.",
    }),
});

export type productCreationSchema = z.infer<typeof productCreationSchema>;

export function ProductCreationDialog(props: BaseDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<productCreationSchema>({
    criteriaMode: "all",
    resolver: zodResolver(productCreationSchema),
  });

  async function handleCreateProduct(data: productCreationSchema) {
    const formData = new FormData();
    const price = priceParseFloat(data.price);

    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", price.toString());
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    await api.post("/api/products/", formData);

    dispatchEvent(
      new CustomEvent("myCustomEvent", {
        detail: { data },
      })
    );

    reset();
  }

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Novo produto"
      description="Cadastro de produtos!"
      content={
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="col-span-1 text-left" htmlFor="name">
                Nome:
              </Label>
              <Input className="col-span-3" id="name" {...register("name")} />
              {errors.name && (
                <span className="text-red-500 font-medium col-span-4">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="col-span-1 text-left" htmlFor="price">
                Preço:
              </Label>
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <NumericFormat
                      className="col-span-3"
                      id="price"
                      onChange={field.onChange}
                      value={field.value ?? ""}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      getInputRef={field.ref}
                      customInput={Input}
                      placeholder="100,00"
                    />
                    {fieldState?.error && (
                      <span className="text-red-500 font-medium col-span-4">
                        {fieldState?.error?.type && fieldState?.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="col-span-1 text-left" htmlFor="name">
                Categoria:
              </Label>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value }, fieldState }) => (
                  <>
                    <Select onValueChange={onChange} defaultValue={value}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>

                      <SelectContent>
                        {categorysMap.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState?.error && (
                      <span className="text-red-500 font-medium col-span-4">
                        {fieldState?.error?.type && fieldState?.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left" htmlFor="description">
                Descrição:
              </Label>
              <Textarea
                className="col-span-3"
                id="description"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500 font-medium">
                  {errors.description?.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="image"
              >
                Adicionar imagem:
              </Label>
              <Input
                type="file"
                id="image"
                {...register("image")}
                className="col-span-3 file:px-4 file:py-1 file:border file:rounded-md file:text-sm file:bg-gray-100 file:text-gray-700"
                aria-describedby="file_input_image"
              />
              {errors.image && (
                <span className="text-red-500 font-medium col-span-4">
                  {errors.image?.message as string}
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" variant="outline" disabled={isSubmitting}>
              Cadastrar
            </Button>
          </DialogFooter>
        </form>
      }
    />
  );
}
