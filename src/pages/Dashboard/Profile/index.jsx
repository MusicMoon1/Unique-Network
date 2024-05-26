import React from "react";
import { Route, Routes } from "react-router-dom";

import EditProfile from "./EditProfile";
import Profile from "./Profile";

export default function index() {
  return (
    <Routes>
      <Route path='/' element={<Profile />} />
      <Route path='edit' element={<EditProfile />} />
    </Routes>
  )
}
