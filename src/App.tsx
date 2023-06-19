import React from "react";
import { Auth, Friends, Home, Profile } from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { CheckEmailInfo } from "./components";

function App() {
  const { isAuth } = useSelector((state: RootState) => state.me);
  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/dialogs" /> : <Navigate to="/login" />
          }
        />
        <Route path="/dialogs" element={<Home />} />
        <Route path="/dialogs" element={<Home />}>
          <Route path=":id" element={<Home />} />
        </Route>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/register/verify" element={<CheckEmailInfo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </div>
  );
}

export default App;
