import React, { FC } from "react";
import styles from "./Users.module.scss";
import MainLayout from "../../components/layouts/MainLayout";
import { UsersList } from "../../components";
import { HomeFilled } from "@ant-design/icons";

const Users: FC = () => {
  return (
    <MainLayout className="users">
      <div className={styles.usersMain}>
        <div className={styles.usersHeader}>
          <div className={styles.breadcrumbs}>
            <HomeFilled /> Пользователи
          </div>
        </div>
        <div className={styles.usersList}>
          <UsersList />
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
