import React, { Suspense, useEffect } from "react";
import { Auth, Users } from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckEmailInfo, SpinIcon } from "./components";
import { selectIsAuth } from "./redux/slices/me/selectors";
import { useAppDispatch } from "./hooks/hooks";
import { getMe } from "./redux/slices/me/asyncActions";

const Profile = React.lazy(() => import("../src/pages/Profile"));
const Home = React.lazy(() => import("../src/pages/Home"));

function App() {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [isAuth]);
  return (
    <div className="wrapper">
      <Suspense fallback={<SpinIcon tip="Загрузка..." white />}>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? <Navigate to="/dialogs" /> : <Navigate to="/login" />
            }
          />
          {/*<Route path="/dialogs" element={<Home />} />*/}
          <Route path="/dialogs" element={<Home />}>
            <Route path=":id" element={<Home />} />
          </Route>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/register/verify" element={<CheckEmailInfo />} />

          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/users" element={<Users />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
