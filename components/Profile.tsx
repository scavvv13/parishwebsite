"use client";

import { motion } from "framer-motion";
import { useUser } from "@/app/providers/UserProvider";
import EmployeeID from "./EmployeeID";
import { Button } from "./ui/button";

const Profile = () => {
  const { user } = useUser();
  const name = `${user?.givenName || ""} ${user?.familyName || ""}`;
  //   const initials = `${user?.givenName?.[0] || ""}${
  //     user?.familyName?.[0] || ""
  //   }`.toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center "
    >
      <EmployeeID
        name={name}
        idNumber="01045"
        accessType="Admin"
        dateJoined="June 14, 2020"
        profilePicture="/2x2.png"
      />
      <Button
        variant="brutalist"
        className="mt-4"
        onClick={() => alert("Edit Profile Clicked")}
      >
        Save Profile
      </Button>
    </motion.div>
  );
};

export default Profile;
