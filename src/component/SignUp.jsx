import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name,setName]=useState('');

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name, 
      });
  
      console.log("User registered successfully");
      toast.success("Signup successful!", {
        position: "top-center",
      });
  
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <img
            src="https://img.icons8.com/fluency/96/water-bottle.png"
            alt="logo"
            className="mx-auto w-20 h-20"
          />
          <h2 className="text-3xl font-bold text-blue-700 mt-2">Create Your Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Enter Name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
