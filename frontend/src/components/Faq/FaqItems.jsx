import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const FaqItems = ({ item }) => {
  4;
  const [isOpen, setIsOpen] = useState(false);
  const toggleAcccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="p-3 lg:p-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5  cursor-pointer "
      onClick={toggleAcccordion}
    >
      <div className="flex  justify-between items-center gap-5 ">
        <h4 className="text-base  leading-7 lg:text-lg lg:leading-8 text-headingColor  ">
          {item.question}
        </h4>
        <div
          className={`${
            isOpen && "bg-primaryColor text-white border-none"
          }w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
        >
          {" "}
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <p className="text-[14px] leading-6 lg:text-medium lg:leading-7 font-[400] text-textColor  duration-200 ">
            {item.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqItems;
