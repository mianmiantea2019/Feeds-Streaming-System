import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
     this is progile
    </div>
  );
}

export default ProfileScreen;
