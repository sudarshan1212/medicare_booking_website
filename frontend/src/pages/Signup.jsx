import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import signup from "../assets/images/signup.gif";
import avatar from "../assets/images/hero-img02.png";
import uplaodImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uplaodImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    // console.log(file);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signup} className="w-full rounded-l-lg" />
            </figure>
          </div>
          <div className=" rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className=" text-primaryColor "> account</span>
            </h3>
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
                  required
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor="profession"
                  className="text-headingColor font-bold text-vase leading-7"
                >
                  Are you a:
                  <select
                    name="role"
                    id="profession"
                    value={formData.role}
                    onChange={handleInputChange}
                    className=" text-textColor font-bold text-[15px] leading-7 focus:outline-none px-4 py-3"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
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
                {selectedFile && (
                  <figure
                    className="w-[60px] h-[60px] rounded-full border-2 border-solid  border-primaryColor flex items-center justify-center
                 "
                  >
                    <img
                      src={previewURL}
                      className="w-ful h-full rounded-full"
                    />
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
                    Upload photo
                  </label>
                </div>
              </div>
              <div className="mt-7">
                <button
                  disabled={loading && true}
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 "
                >
                  {loading ? (
                    <HashLoader sixe={35} color="#ffffff" />
                  ) : (
                    " Signup"
                  )}
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;