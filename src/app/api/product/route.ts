import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!product) {
    return null;
  }
  const productFormat = JSON.stringify({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  return new Response(productFormat, {
    status: 200,
  });
}
