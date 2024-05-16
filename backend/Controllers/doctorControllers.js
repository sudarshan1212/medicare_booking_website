import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      Status: "SUCCESS",
      message: "Updated Successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Error in updateDoctor" });
  }
};
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      Status: "SUCCESS",
      message: "Deleted Successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Error in deleteDoctor" });
  }
};
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const singleDoctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    if (!singleDoctor) {
      return res
        .status(400)
        .json({ Status: "INVALID", message: "Error in get single user" });
    }
    res.status(200).json({
      Status: "SUCCESS",
      message: "Doctor found Successfully",
      data: singleDoctor,
    });
  } catch (error) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Error in get single Doctor" });
  }
};
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          {
            name: { $regex: query, $options: "i" },
          },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    // const doctors = await Doctor.find({});
    res.status(200).json({
      Status: "SUCCESS",
      length: doctors.length,
      message: "Doctors found Successfully",
      data: doctors,
    });
  } catch (error) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Error in getAllDoctor" });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  // console.log(doctorId);
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(400).json({
        Status: "INVALID",
        message: "doctor not found in get userprofile",
      });
    }
    const { password, ...rest } = doctor._doc;

    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      Status: "SUCCESS",
      message: "Profile info is getting",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res
      .status(500)
      .json({ Status: "INVALID", message: "Error in get use profile " });
  }
};
// export const getDoctorProfile = async (req, res) => {
//   const doctorId = req.userId;
//   try {
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({
//         status: "error",
//         message: "Doctor not found",
//       });
//     }
//     const { password, ...rest } = doctor._doc;
//     const appointments = await Booking.find({ doctor: doctorId });
//     res.status(200).json({
//       status: "success",
//       message: "Profile info retrieved successfully",
//       data: { ...rest, appointments },
//     });
//   } catch (error) {
//     console.error("Error in get doctor profile:", error);
//     res.status(500).json({ status: "error", message: "Internal server error" });
//   }
// };
