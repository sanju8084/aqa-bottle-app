import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [isUserDocFound, setIsUserDocFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(currentUser);
          setUserName(docSnap.data().Name);
          setIsUserDocFound(true);
        } else {
          setUser(null);
          setUserName("");
          setIsUserDocFound(false);
        }
      } else {
        setUser(null);
        setUserName("");
        setIsUserDocFound(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const currentUser = auth.currentUser;

    try {
      if (currentUser) {
        await deleteDoc(doc(db, "users", currentUser.uid));
      }

      await signOut(auth);
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed", { position: "top-center" });
    }
  };

  return (
    <nav className="bg-blue-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <Link to="/" className="hover:text-gray-200">AquaBottle</Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/products" className="hover:text-gray-200">Products</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>

          {user && isUserDocFound ? (
            <div className="relative">
              <div
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-white font-semibold capitalize tracking-wide flex items-center gap-1 group-hover:text-gray-200 transition">
                  👋 {userName}
                </span>
                <img
                  src={user.photoURL || "/profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white group-hover:border-blue-200 transition"
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-blue-600 rounded shadow-lg z-10 transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orderHis"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Order History
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-gray-200">Home</Link>
          <Link to="/products" className="block hover:text-gray-200">Products</Link>
          <Link to="/about" className="block hover:text-gray-200">About</Link>
          <Link to="/contact" className="block hover:text-gray-200">Contact</Link>
          {user && isUserDocFound ? (
            <>
              <Link to="/profile" className="block hover:text-gray-200">My Profile</Link>
              <Link to="/orderHis" className="block hover:text-gray-200">Order History</Link>
              <button
                onClick={handleLogout}
                className="block text-left w-full bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 mt-2"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
