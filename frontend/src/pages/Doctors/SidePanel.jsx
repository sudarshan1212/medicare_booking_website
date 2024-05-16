const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  return (
    <div className=" shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold ">Pice</p>
        <span className="text-base leading-7 lg:text-xl lg:leading-8 text-headingColor font-bold ">
          {ticketPrice} INR
        </span>
      </div>
      <div className=" mt-8">
        <p className="text__para mt-0 font-semibold text-headingColor ">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-sg leading-6 text-textColor font-semibold ">
                {item.day}
              </p>
              <p className="text-sg leading-6 text-textColor font-semibold ">
                {item.startingTime} - {item.endingTime}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn px-2 w-full rounded-lg ">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
