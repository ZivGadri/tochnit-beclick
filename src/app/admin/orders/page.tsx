"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, LogOut } from "lucide-react";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  customerName: string | null;
  customerEmail: string | null;
  projectTitle: string;
  services: string[];
  createdAt: string;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "ממתין",
  CONFIRMED: "אושר",
  IN_PROGRESS: "בביצוע",
  COMPLETED: "הושלם",
  CANCELLED: "בוטל",
  REFUNDED: "הוחזר",
};

const STATUS_VARIANTS: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline",
  CONFIRMED: "secondary",
  IN_PROGRESS: "default",
  COMPLETED: "default",
  CANCELLED: "destructive",
  REFUNDED: "destructive",
};

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user || session.user.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    fetchOrders();
  }, [session, status, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">טוען...</div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
                <ArrowRight className="w-4 h-4 ml-2" />
                חזרה לפאנל
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">ניהול הזמנות</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
              <LogOut className="w-4 h-4 ml-2" />
              התנתק
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">אין הזמנות עדיין</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">תאריך</TableHead>
                  <TableHead className="text-right">לקוח</TableHead>
                  <TableHead className="text-right">שירותים</TableHead>
                  <TableHead className="text-right">סכום</TableHead>
                  <TableHead className="text-right">סטטוס</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="whitespace-nowrap text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("he-IL")}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{order.customerName || "לא צוין"}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail || "—"}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.services.length > 0 ? order.services.join(", ") : order.projectTitle}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium">
                      {order.totalAmount.toLocaleString()} {order.currency === "ILS" ? "₪" : order.currency}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue>
                            <Badge variant={STATUS_VARIANTS[order.status]}>
                              {STATUS_LABELS[order.status]}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
