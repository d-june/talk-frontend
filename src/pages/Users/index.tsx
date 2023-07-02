import React, { FC } from "react";
import { Sidebar, UsersList } from "../../components";
import styles from "./Users.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/me/selectors";
import { Navigate } from "react-router-dom";

const Users: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <>
      {isAuth ? (
        <section className={styles.users}>
          <Sidebar />
          <div className={styles.usersList}>
            <UsersList />
          </div>
        </section>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Users;
