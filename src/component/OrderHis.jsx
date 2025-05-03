import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OrderHis = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const q = query(
            collection(db, "orders"),
            where("uid", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const orderList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(orderList);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-blue-600 text-lg">Loading your order history...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-600 text-lg">Please login to view your order history.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-6 flex justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          🧾 Your Water Bottle Orders
        </h2>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="border border-blue-100 rounded-xl p-5 bg-blue-50 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">
                    Order #{index + 1}
                  </span>
                  <span className="text-sm text-gray-500 italic">
                    {order.timestamp?.seconds
                      ? new Date(order.timestamp.seconds * 1000).toLocaleString()
                      : "No timestamp"}
                  </span>
                </div>
                <p><strong className="text-gray-700">Name:</strong> {order.name}</p>
                <p><strong className="text-gray-700">Phone:</strong> {order.phone}</p>
                <p><strong className="text-gray-700">Address:</strong> {order.address}</p>
                <div className="mt-2 flex flex-col gap-1">
                  <p><strong className="text-gray-700">1L Bottles:</strong> {order.bottle1L}</p>
                  <p><strong className="text-gray-700">5L Bottles:</strong> {order.bottle5L}</p>
                  <p><strong className="text-gray-700">20L Bottles:</strong> {order.bottle20L}</p>
                </div>
                <div className="mt-4">
                  <p>
                    <strong className="text-gray-700">Delivery Status:</strong>{" "}
                    <span className={`font-semibold ${order.deliveryStatus === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
                      {order.deliveryStatus || "Pending"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHis;
