"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
  order_count: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  async function fetchUsers() {
    const { data: authUsers } = await supabase.auth.admin?.listUsers();

    const { data: profiles } = await supabase
      .from("profiles")
      .select("*");

    const { data: orders } = await supabase
      .from("orders")
      .select("user_id");

    // Combine data
    const combined: UserProfile[] = [];

    // Get users from profiles table
    if (profiles) {
      for (const profile of profiles) {
        const { data: userData } = await supabase.auth.admin?.getUserById(profile.id);
        combined.push({
          id: profile.id,
          email: userData?.user?.email || "Unknown",
          full_name: profile.full_name || "No name",
          phone: profile.phone || "",
          created_at: profile.created_at,
          order_count: orders?.filter((o: any) => o.user_id === profile.id).length || 0,
        });
      }
    }

    setUsers(combined);
    setLoading(false);
  }

  useEffect(() => { fetchUsers(); }, []);

  async function viewOrders(userId: string) {
    setSelectedUser(userId);
    setOrdersLoading(true);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setUserOrders(data || []);
    setOrdersLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2C2C2C] mb-8">Users</h1>

      {loading ? (
        <p className="text-[#666666]">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-[#666666] text-center py-8">No users yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 mb-8">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B1E1E] flex items-center justify-center text-white font-bold text-sm">
                    {(user.full_name || user.email)[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-[#2C2C2C] text-sm">{user.full_name}</p>
                    <p className="text-[#999] text-xs">{user.email}</p>
                    {user.phone && <p className="text-[#999] text-xs">📱 {user.phone}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#666666] text-xs">{user.order_count} orders</span>
                  <button
                    onClick={() => viewOrders(user.id)}
                    className="text-xs text-[#8B1E1E] hover:underline"
                  >
                    View orders
                  </button>
                </div>
              </div>

              {/* Order history for this user */}
              {selectedUser === user.id && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <h3 className="font-semibold text-[#2C2C2C] text-sm mb-3">Order history</h3>
                  {ordersLoading ? (
                    <p className="text-[#999] text-xs">Loading...</p>
                  ) : userOrders.length === 0 ? (
                    <p className="text-[#999] text-xs">No orders yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {userOrders.map((order) => (
                        <div key={order.id} className="bg-[#F9F9F9] rounded-xl p-3">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-[#999]">
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                            <span className={`font-medium ${
                              order.status === "delivered" ? "text-green-600" :
                              order.status === "cancelled" ? "text-red-600" :
                              "text-blue-600"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          {order.items.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between text-xs text-[#666666]">
                              <span>{item.quantity}x {item.name}</span>
                              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-xs font-bold">
                            <span className="text-[#2C2C2C]">Total</span>
                            <span className="text-[#8B1E1E]">₦{order.total.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}