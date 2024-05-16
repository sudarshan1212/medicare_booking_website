import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  // console.log(user.role);
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  let user = null;

  try {
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }
    //check if user exist
    if (user) {
      return res
        .status(400)
        .json({ status: "INVALID", message: "User already exists" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // storing in database
    if (role == "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        specialization,
        photo,
        gender,
        role,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ Status: "SUCCESS", message: "User successfully created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Status: "INVALID", message: "Error in Register" });
  }
};
export const login = async (req, res) => {
  try {
    const { email } = req.body;
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    //USER NOT EXIST
    if (!user) {
      return res
        .status(40)
        .json({ Status: "INVALID", message: "User not found in login" });
    }
    //COMPARE PASSWORDS
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ Status: "INVALID", message: "Password inCorrect in Login" });
    }

    //get token
    const token = generateToken(user);
    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      Status: "SUCCESS",
      message: "All fields are mandotory",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(400).json({ Status: "INVALID", message: "Error in login" });
    console.log(error);
  }
};
