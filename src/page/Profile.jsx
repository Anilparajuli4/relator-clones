import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  async function logOut() {
    await auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "user", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
        toast.success("profile detail update");
      }
    } catch (error) {
      toast.error("Could not update the profile detail");
      console.log(error);
    }
  }
  return (
    <>
      <section className="max-w-6xl m-auto flex justify-center items-center flex-col">
        <h1 className="font-bold text-3xl text-center mt-8">My Profile</h1>
        <form className="w-full md:w-[50%] mt-6 px-3">
          <input
            className={`w-full rounded px-4 py-2 text-xl transition ease-in-out bg-white text-gray-700 borderborder-gray-300  ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
            type="text"
            value={name}
            id="name"
            disabled={!changeDetail}
            onChange={onChange}
          />
          <input
            className="w-full rounded  px-4 py-2 transition ease-in-out bg-white border border-gray-300 text-xl text-gray-600 mt-6"
            id="email"
            value={email}
            disabled
          />
          <div className="flex mt-6 justify-between whitespace-nowrap text-sm md:text-lg">
            <p>
              Do want to change your name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((state) => !state);
                }}
                className="text-red-600 hover:text-red-700 cursor-pointer transition ease-in-out duration-200 ml-1"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p
              onClick={logOut}
              className="text-blue-600 hover:text-blue-800 cursor-pointer transition ease-in-out duration-200"
            >
              Sign Out
            </p>
          </div>
          <button className="w-full bg-blue-500 mt-6 py-3 px-2 rounded uppercase text-white font-semibold border-none shadow-md hover:bg-blue-700">
            Sell or rent your home
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
