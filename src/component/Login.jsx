import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
await signInWithEmailAndPassword(auth,email,password);
console.log("user login successfully")
toast.success("login successful!",{
  position:"top-center",
});
navigate("/");

}
catch(error){
console.log(error);
toast.success(error.message,{
  position:"bottom-center"
})

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
          <h1 className="text-3xl font-bold text-blue-700 mt-2">Pure Aqua Login</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-400 hover:text-blue-800 font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
