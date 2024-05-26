import React from "react";
import Auth from "../pages/Auth";
import NoPage from "./Dashboard/NoPage";
import Dashboard from "../pages/Dashboard";
import Fontend from "../pages/Fontend";
import PrivateRoute from '../components/PrivateRoute';

import { useAuthcontexts } from '../context/Authcontexts';
import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./Dashboard/Home/Home";

export default function Index() {

  const { isAuthenticated } = useAuthcontexts();
  return (
    <Routes>
      <Route path='/*' element={< Fontend />} />
      <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
      <Route path='/auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to="/" />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}
