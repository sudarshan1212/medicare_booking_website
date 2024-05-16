import { useState, useContext } from "react";
import { BASE_URL } from "../../../config";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import useGetProfile from "../../hooks/useFetchData.jsx";
import Tab from "./Tab";
import photp from "../../assets/images/doctor-img01.png";
import starCion from "../../assets/images/Star.png";
import DoctorAbout from "./../../pages/Doctors/DoctorAbout";
import Profile from "./Profile.jsx";
import Appointment from "./Appointment.jsx";
// import Profile from "./../user-account/Profile";
const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );
  // console.log(data.isApproved);
  const [tab, setTab] = useState("overview");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errormessage={error} />}

        {!error && !loading && (
          <div className="grid lg:grid-cols-3 gap-7 lg:gap-[50px]">
            <Tab tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12" y2="16"></line>
                  </svg>
                  <span className="">
                    <div className="ml-3 text-sm font-medium">
                      {" "}
                      To get approve please complete your profile Well review
                      manually andapprove within 3days.{" "}
                    </div>
                  </span>
                </div>
              )}
              <div>
                {tab == "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-52  ">
                        <img src={photp} className="w-full" />
                      </figure>
                      <div className=" text-center">
                        {data.specialization && (
                          <span className="bg-[#CCF0F3] text-irisBlueCOlor py-1 px-4 lg:py-2 lg:px-6 rounded text-xs lead4 lg:text-balance lg:leading-6 font-semibold  ">
                            {data?.specialization}
                          </span>
                        )}
                        <h3 className="text-[22px] leading-8 font-bold text-headingColor  capitalize mt-3">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <span className="flex items-center gap-2  text-headingColor text-base leading-5 lg:text-base lg:leading-6 font-semibold">
                            <img src={starCion} alt="" />
                            {data.averageRating}
                          </span>
                          <span className="  text-textColor text-sm leading-5 lg:text-base text-center lg:leading-6 font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className=" text__para  font-semibold lg:max-w-[390px] leading-6">
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab == "appointments" && (
                  <Appointment appointments={data.appointments} />
                )}

                {tab == "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
