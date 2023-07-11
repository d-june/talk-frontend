import React, { useEffect } from "react";
import { Auth, Friends, Home, Profile, Users } from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { CheckEmailInfo } from "./components";
import { selectIsAuth, selectToken } from "./redux/slices/me/selectors";
import { useAppDispatch } from "./hooks/hooks";
import { getMe } from "./redux/slices/me/asyncActions";
import { getDialogs } from "./redux/slices/dialogs/asyncActions";

function App() {
  const isAuth = useSelector(selectIsAuth);
  const token = useSelector(selectToken);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe());
    dispatch(getDialogs(token));
  }, [isAuth]);
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
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </div>
  );
}

export default App;
