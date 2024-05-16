import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "Error in authToken" });
  }
  try {
    const token = authToken.split(" ")[1];
    // console.log(authToken);
    //VERIFYING TOKEN

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // if(!decoded){
    //   return  res.status(400).json({Status:"INVALID",message:"All fields are mandotory"})
    // }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res
        .status(400)
        .json({ Status: "INVALID", message: "Error in TokenExpiredError" });
    }
    return res
      .status(400)
      .json({ Status: "INVALID", message: "Error in Authentication" });
  }
};
export const restrict = (role) => async (req, res, next) => {
  const userId = req.userId;
  let user;
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);
  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  // console.log(userId);
  if (!role.includes(user.role)) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "You are Unauthorized" });
  }
  next();
};
