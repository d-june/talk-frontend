import React, { FC } from "react";

import MainLayout from "../../components/layouts/MainLayout";
import { Header, UsersList } from "../../components";

import styles from "./Users.module.scss";

const Users: FC = () => {
  return (
    <MainLayout className="users">
      <div className={styles.usersMain}>
        <Header usersPage />
        <UsersList />
      </div>
    </MainLayout>
  );
};

export default Users;
