import { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "./../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";

import FeedbackForm from "./FeedbackForm";

const FeedBack = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px]  leading-7 text-headingColor font-bold mb-7 ">
          All review({totalRating})
        </h4>
        {reviews.map((item, index) => (
          <div key={index} className="flex justify-between gap-10 mb-7">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img src={item.user?.photo} className="w-full" alt="" />
              </figure>
              <div>
                <h5 className=" text-base leading-6 text-primaryColor font-bold">
                  {item.user?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor ">
                  {formateDate(item?.createdAt)}
                </p>
                <p className="text__para mt-1 font-medium text-sm ">
                  {item.reviesText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(item?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default FeedBack;
