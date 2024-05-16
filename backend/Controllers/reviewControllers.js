import Doctor from "../models/DoctorSchema.js";
import Review from "../models/ReviewSchema.js";

//get reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    // console.log("Review:", reviews);
    res
      .status(200)
      .json({ Status: "SUCCESS", message: "found review", data: reviews });
  } catch (error) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Error in getAll reviews" });
  }
};
//create review
export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;
  const newReview = new Review(req.body);
  console.log(newReview);
  try {
    const savedReview = await newReview.save();
    // console.log("savedReview");
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });
    res.status(200).json({
      Status: "SUCCESS",
      message: "Review Submitted",
      data: savedReview,
    });
  } catch (error) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Error in createReview" });
  }
};
