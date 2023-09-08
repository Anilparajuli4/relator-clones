import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAUTH from "../Component/OAUTH";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = formData;
  const [showPassword, setShowPassword] = useState(false);
  function onChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      setFormData({ email: "", password: "", name: "" });
      toast.success("sign up success");
      navigate("/");
    } catch (error) {
      toast.error("something went wrong");
    }
  }
  return (
    <section>
      <h1 className="text-center mt-4 font-bold text-2xl ">Sign up</h1>
      <div className="flex justify-center flex-wrap px-6 py-12 items-center max-w-6xl m-auto">
        <div className="md:w-[60%] lg:w-[50%] mb-12 lg:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
            alt="key"
          />
        </div>
        <div className=" w-full md:w-[60%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="w-full  mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full name"
            />
            <input
              className="w-full  mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl  text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-4 right-3 text-xl cursor-pointer"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-4 right-3 text-xl cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-between mb-6">
              <p>
                Have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  to={"/sign-in"}
                >
                  Sign in
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                  to={"/forgot-password"}
                >
                  Forgot password
                </Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800">
              sign in
            </button>
            <div className="">
              <p className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                OR
              </p>
            </div>
          </form>
          <OAUTH />
        </div>
      </div>
    </section>
  );
}

export default SignUp;
