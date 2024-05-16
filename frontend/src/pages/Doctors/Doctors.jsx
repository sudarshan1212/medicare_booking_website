import { doctors } from "./../../assets/data/doctors";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "./../../components/Testimonial/Testimonial";

import useFetchData from "./../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { useEffect, useState } from "react";
const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const handleSearch = () => {
    setQuery(query.trim());
    console.log("handle search");
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);
    return () => clearTimeout(timeOut);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
  return (
    <>
      <section>
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex  items-center justify-between ">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Doctor"
              className="py-2 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer  placeholder:text-textColor"
            />

            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error />}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="continer">
          {" "}
          <div className="xl:w-[470px] mx-auto ">
            <h2 className="heading text-center"> What our Patient say</h2>
            <p className="text__para text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum,
              cum.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
