import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth";
import Home from "../home";

import { UserContext } from "../../App";

const AppRouter = (props) => {
  const userData = useContext(UserContext);

  return (
    <Routes>
      <Route path="/*" element={userData.email ? <Home /> : <Login />} />
    </Routes>
  );
};

export default AppRouter;
