import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Current user:", currentUser?.email);
      setUser(currentUser);

      if (currentUser?.email?.toLowerCase() === "sanjanakiei20@gmail.com") {
        setIsAdmin(true);
        await fetchOrders();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const orderList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched orders:", orderList);
      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { deliveryStatus: newStatus });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, deliveryStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600 text-lg">
        Loading orders...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        Access denied. Admins only.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-6 flex justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          📋 Admin - All Orders
        </h2>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No orders found.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="border border-indigo-100 rounded-xl p-5 bg-indigo-50 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Order #{index + 1}</span>
                  <span className="text-sm text-gray-500 italic">
                    {order.timestamp?.seconds
                      ? new Date(order.timestamp.seconds * 1000).toLocaleString()
                      : "No timestamp"}
                  </span>
                </div>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <div className="mt-2 flex flex-col gap-1">
                  <p><strong>1L:</strong> {order.bottle1L}</p>
                  <p><strong>5L:</strong> {order.bottle5L}</p>
                  <p><strong>20L:</strong> {order.bottle20L}</p>
                </div>
                <div className="mt-4">
                  <strong>Delivery Status:</strong>{" "}
                  <select
                    className="ml-2 border p-1 rounded text-sm"
                    value={order.deliveryStatus || "Pending"}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
