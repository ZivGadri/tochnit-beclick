import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get dashboard statistics
    const [
      totalQuotes,
      pendingQuotes,
      totalOrders,
      revenueData,
      newContacts,
      portfolioItems
    ] = await Promise.all([
      prisma.quote.count(),
      prisma.quote.count({ where: { status: "PENDING" } }),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: { in: ["CONFIRMED", "COMPLETED"] } }
      }),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.portfolio.count({ where: { status: "PUBLISHED" } })
    ]);

    const stats = {
      totalQuotes,
      pendingQuotes,
      totalOrders,
      totalRevenue: revenueData._sum.totalAmount || 0,
      newContacts,
      portfolioItems,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
