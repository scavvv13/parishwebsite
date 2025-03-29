import React from "react";
import Image from "next/image";

interface EmployeeIDProps {
  name: string;
  idNumber: string;
  accessType: string;
  dateJoined: string;
  profilePicture: string;
}

const EmployeeID: React.FC<EmployeeIDProps> = ({
  name,
  idNumber,
  accessType,
  dateJoined,
  profilePicture,
}) => {
  return (
    <div className="relative w-[430px] h-[260px] bg-white dark:bg-gray-900 rounded-xl shadow-xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden flex">
      {/* Left Section - Profile */}
      <div className="w-36 bg-blue-100 dark:bg-gray-800 flex items-center justify-center">
        <Image
          src={profilePicture}
          alt={`${name} Profile`}
          width={90}
          height={90}
          className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Right Section - Details */}
      <div className="flex flex-col justify-between p-3  w-full">
        {/* Company Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/madonnalogo.png" alt="Logo" width={30} height={30} />
          <h2 className="text-md playfair font-bold text-gray-800 dark:text-white">
            Madonna del Divino Amore Parish
          </h2>
        </div>

        {/* Employee Info */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-md text-gray-600 dark:text-gray-400">
            ID: {idNumber}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            {accessType}
          </p>
        </div>

        {/* Date Joined */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Joined: {dateJoined}
        </p>
      </div>
    </div>
  );
};

export default EmployeeID;
