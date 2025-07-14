import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
  }

  const { name, username, image, email } = data;

  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!emailExists) {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        image,
        email,
      },
    });

    const userFormat = JSON.stringify({
      checkoutUrl: user,
    });

    return new Response(userFormat, {
      status: 201,
    });
  }

  const userFormat = JSON.stringify({
    checkoutUrl: emailExists,
  });

  return new Response(userFormat, {
    status: 201,
  });
}
