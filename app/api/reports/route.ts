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
    const data = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
    });

    const serializedData = data.map((report) => ({
      ...report,
    }));

    return NextResponse.json({ data: serializedData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 },
    );
  }
}
