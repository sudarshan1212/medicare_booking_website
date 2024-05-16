import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      Status: "SUCCESS",
      message: "Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ Status: "INVALID", message: "Error in updateUser" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      Status: "SUCCESS",
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({ Status: "INVALID", message: "Error in deleteUser" });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await User.findById(id);
    if (!singleUser) {
      return res
        .status(400)
        .json({ Status: "INVALID", message: "Error in get single user" });
    }
    res.status(200).json({
      Status: "SUCCESS",
      message: "User found Successfully",
      data: singleUser,
    });
  } catch (error) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Error in get single user" });
  }
};
export const getAllUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      Status: "SUCCESS",
      length: users.length,
      message: "Users found Successfully",
      data: users,
    });
  } catch (users) {
    res.status(400).json({ Status: "INVALID", message: "Error in getAllUser" });
  }
};
// export const getUserProfile = async (req, res) => {
//   const userId = req.userId;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(400).json({
//         Status: "INVALID",
//         message: "User not found in get userprofile",
//       });
//     }
//     const { password, ...rest } = user._doc;
//     res.status(200).json({
//       Status: "SUCCESS",
//       message: "Profile info is getting",
//       data: { ...rest },
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ Status: "INVALID", message: "Error in get use profile " });
//   }
// };
export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  try {
    if (!userId) {
      return res.status(400).json({
        status: "INVALID",
        message: "User ID is required.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "INVALID",
        message: "User not found.",
      });
    }

    const { password, ...rest } = user._doc;

    return res.status(200).json({
      status: "SUCCESS",
      message: "Profile info retrieved successfully.",
      data: { ...rest },
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in getUserProfile:", error);

    return res.status(500).json({
      status: "ERROR",
      message: "Internal server error.",
    });
  }
};
export const getMyAppointments = async (req, res) => {
  try {
    //STEP-1 : RETRIEVE APPINTMENTS FROM BOOKING FOR SPECIFIC USER
    const bookings = await Booking.find({ user: req.userId });
    //STEP-2: EXTREACT DOCTOR IDS FROM APPOINTMENT BOOKINGS
    const doctorIds = bookings.map((el) => el.doctor.id);
    //STEP-3 :RETRIEVE DOCTORE USING DOCTOR IDS
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      Status: "SUCCESS",
      message: "Appointments are gettion",
      data: doctors,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Status: "INVALID", message: "Error in getMyAppointments" });
  }
};
