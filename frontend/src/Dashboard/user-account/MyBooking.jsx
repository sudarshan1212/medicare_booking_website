import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loading from "./../../components/loading/Loading";
import Error from "./../../components/error/Error";
import DoctorCard from "./../../components/Doctors/DoctorCard";

const MyBooking = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errormessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center  text-primaryColor font-semibold leading-6 text-xl">
          YOu did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBooking;
