import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { getAllUsers } from "../../redux/slices/users/asyncActions";

import { SpinIcon, User } from "../index";

import { Pagination, PaginationProps } from "antd";
import styles from "./UsersList.module.scss";

const UsersList = () => {
  const [pageHeight, setPageHeight] = useState(window.innerHeight - 70);
  const { isLoading, users, page, total } = useAppSelector(
    (state: RootState) => state.users
  );
  const [currentPage, setCurrentPage] = useState(page);
  const dispatch = useAppDispatch();

  const onResizePage = () => {
    setPageHeight(window.innerHeight - 70);
  };

  useEffect(() => {
    window.addEventListener("resize", onResizePage);
    return () => {
      window.removeEventListener("resize", onResizePage);
    };
  }, [window.innerHeight]);

  useEffect(() => {
    dispatch(getAllUsers(currentPage));
  }, [currentPage]);
  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.usersContent} style={{ height: pageHeight }}>
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
  );
};

export default UsersList;
