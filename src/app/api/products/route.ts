import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("image");
  const name = formData.get("name")?.toString();
  const category = formData.get("category")?.toString();
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description")?.toString();

  if (!file || !name || !description || !category || !price) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando" },
      { status: 400 }
    );
  }

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "Imagem inválida" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadDir = path.join(process.cwd(), "public/uploads");
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  const imageUrl = `/uploads/${file.name}`;

  const product = await prisma.product.create({
    data: {
      name,
      category,
      price,
      description,
      imageUrl,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
  }

  const { searchParams } = req.nextUrl;

  const name = searchParams.get("name");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (name && name.trim() !== "") {
    where.name = { contains: name };
  }
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { created_at: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  const formattedProducts = products.map((product) => ({
    ...product,
    createdAt: product.created_at,
  }));

  return NextResponse.json({ products: formattedProducts, total });
}
