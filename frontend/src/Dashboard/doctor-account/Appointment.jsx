import React from "react";
import { formateDate } from "./../../utils/formateDate";

const Appointment = ({ appointments }) => {
  return (
    <table className="w-full  text-left text-sm text-gray-500">
      <thead className=" text-xs textgra uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked on
          </th>
        </tr>
        <tbody>
          {appointments.map((item, index) => (
            <tr key={index}>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img src={item.user.photo} className="w-10 h-10" alt="" />

                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {item.user.name}
                  </div>
                  <div className="text-noraml text-gray-500">
                    {item.user.email}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 ">{item.user.gender}</td>
              <td className="px-6 py-4">
                {item.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 "></div>
                    Paid
                  </div>
                )}
                {!item.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500  mr-2"></div>
                    Paid
                  </div>
                )}
              </td>
              <td className="px-6 py-4">{item.ticketPrice} </td>
              <td className="px-6 py-4">{formateDate(item.createAt)} </td>
            </tr>
          ))}
        </tbody>
      </thead>
    </table>
  );
};

export default Appointment;
