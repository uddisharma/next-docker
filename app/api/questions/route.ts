import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

declare global {
  interface BigInt {
    toJSON(): number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
};

export async function GET() {
  try {
    const data = await prisma.question.findMany({
      orderBy: { sequence: "asc" },
      where: {
        isDeleted: false,
        isActive: true,
      },
      select: {
        text: true,
        sequence: true,
        questionType: true,
        options: {
          orderBy: { sequence: "asc" },
          select: {
            text: true,
            sequence: true,
          },
          where: {
            isDeleted: false,
            isActive: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 },
    );
  }
}
