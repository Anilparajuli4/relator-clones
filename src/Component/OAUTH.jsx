import { FcGoogle } from "react-icons/fc";
function OAUTH() {
  return (
    <button className="flex items-center justify-center bg-red-700 w-full text-sm px-3 py-3 hover:bg-red-800 active:bg-red-900 uppercase rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out ">
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue with google
    </button>
  );
}

export default OAUTH;
