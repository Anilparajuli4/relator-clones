import { useState } from "react";
import { Link } from "react-router-dom";
import OAUTH from "../Component/OAUTH";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <section>
      <h1 className="text-center mt-4 font-bold text-2xl ">Forgot Password</h1>
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
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />

            <div className="flex justify-between mb-6">
              <p>
                Don't have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  to={"/sign-up"}
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                  to={"/sign-in"}
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800">
              send reset password
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

export default ForgotPassword;
