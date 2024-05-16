import { useState } from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import MyBooking from "./MyBooking";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("");
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
    console.log(userData, "userdata");
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className=" max-w-[1170px] px-5 mx-auto">
      {loading && !error && <Loading />}
      {error && !loading && <Error errormessage={error} />}
      {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-10">
          <div className=" pb-[50px] px-[30px] rounded-md ">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor  ">
                <img
                  src={userData.photo}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-7 text-headingColor font-bold">
        {      userData.name}
              </h3>
              <p className=" text-textColor text-base leading-6 font-medium ">
              {userData.email}
              </p>
              <p className=" text-textColor text-base leading-6 font-medium ">
              Blood Type:
                <span className="ml-2 text-headingColor text-xl leading-8">
                {userData.bloodType}

                </span>
              </p>
            </div>
            <div className=" mt-12 md:mt-24 ">
              <button
                onClick={handleLogout}
                className="w-full bg-[#181A1E] p-3 text-base leading-7 rounded-md text-white "
              >
                Logout
              </button>
              <button className="w-full mt-4 bg-red-600 p-3 text-base leading-7 rounded-md text-white ">
                Delete account
              </button>
            </div>
          </div>
          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => {
                  setTab("bookings");
                }}
                className={`${
                  tab === "bookings" &&
                  "bg-primaryColor text-white font-normal "
                } p-2 mr-5 px5 rounded-md text-headingColor font-semibold text-base leading-7 border border-solid border-primaryColor `}
              >
                My Bookings
              </button>
              <button
                onClick={() => {
                  setTab("settings");
                }}
                className={`${
                  tab === "settings" &&
                  "bg-primaryColor text-white font-normal "
                } p-2 mr-5 px5 rounded-md text-headingColor font-semibold text-base leading-7 border border-solid border-primaryColor `}
              >
                Profile Settings
              </button>
            </div>
            {tab === "bookings" && <MyBooking />}
            {tab === "settings" && <Profile user={userData} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
