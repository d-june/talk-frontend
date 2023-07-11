import React, { FC, useEffect, useState } from "react";
import styles from "./Users.module.scss";
import MainLayout from "../../components/layouts/MainLayout";
import { SpinIcon, User } from "../../components";
import { HomeFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { getAllUsers } from "../../redux/slices/users/asyncActions";
import { Pagination, PaginationProps } from "antd";

const Users: FC = () => {
  const { isLoading, users, page, total } = useAppSelector(
    (state: RootState) => state.users
  );
  const [currentPage, setCurrentPage] = useState(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers(currentPage));
  }, [currentPage]);

  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout className="users">
      <div className={styles.usersMain}>
        <div className={styles.usersHeader}>
          <div className={styles.breadcrumbs}>
            <HomeFilled /> Пользователи
          </div>
        </div>
        <div className={styles.usersContent}>
          {isLoading ? (
            <SpinIcon tip="Загружаю пользователей..." />
          ) : (
            <>
              <div className={styles.usersList}>
                {users &&
                  users.map((user) => {
                    return <User {...user} key={user._id} />;
                  })}
              </div>
              <Pagination
                current={page}
                total={total}
                onChange={onPageChange}
                className={styles.pagination}
              />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
