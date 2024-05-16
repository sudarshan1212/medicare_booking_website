// import { doctors } from "./../../assets/data/doctors";
import DoctorCard from "./DoctorCard";
import Loading from "./../loading/Loading";
import Error from "./../error/Error";
import useFetchData from "./../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  // console.log(doctors);

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
