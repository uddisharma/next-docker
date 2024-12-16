"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { reportSchema, type ReportFormData } from "@/lib/schemas";

export async function submitReport(reportData: ReportFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedData = reportSchema.parse(reportData);

  const { userId, questions } = validatedData;

  try {
    const report = await prisma.report.create({
      data: {
        userId,
        startTime: new Date(),
        endTime: new Date(),
        sessionId: session.id || "",
        recommendation: {},
        questions: questions,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/reports");
    return report;
  } catch (error) {
    console.error("Error submitting report:", error);
    throw new Error("Failed to submit report");
  }
}

export async function getReports() {
  return prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}
