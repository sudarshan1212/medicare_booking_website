import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import uplaodImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "patient",
    bloodType: "",
  });
  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uplaodImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    // console.log(file);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mt-10">
      {" "}
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            className="w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            className="w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            className="w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            name="bloodType"
            placeholder="Blood Type"
            value={formData.bloodType}
            className="w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label
            htmlFor="gender"
            className="text-headingColor font-bold text-base leading-7 "
          >
            Gender:
            <select
              name="gender"
              id="gender"
              onChange={handleInputChange}
              value={formData.gender}
              className=" text-textColor font-bold text-[15px] leading-7 focus:outline-none px-4 py-3"
            >
              <option value="">Select</option>

              <option value="male">male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure
              className="w-[60px] h-[60px] rounded-full border-2 border-solid  border-primaryColor flex items-center justify-center
       "
            >
              <img src={formData.photo} className="w-ful h-full rounded-full" />
            </figure>
          )}
          <div className=" relative w-[130px] h-[50px] hover:scale-105 duration-200">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg,.png"
              className="absolute top-0 left-0 w-full hfull opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute t0 l0 w-full h-full items-center flex px-[0.75rem] py-[0.375rem] text-base leading-6 overflow-hidden 
        bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
            >
              {selectedFile ? selectedFile.name : "uplaod Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 "
          >
            {loading ? <HashLoader sixe={25} color="#ffffff" /> : " Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
