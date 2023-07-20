import React, { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

import { Status } from "../index";

import { HomeFilled } from "@ant-design/icons";
import styles from "./Header.module.scss";

type PropsType = {
  chatPage?: boolean;
  profilePage?: boolean;
  usersPage?: boolean;
};

const Header: FC<PropsType> = ({ chatPage, profilePage, usersPage }) => {
  const { data } = useAppSelector((state: RootState) => state.me);
  const { profile } = useAppSelector((state: RootState) => state.profile);

  const { id } = useParams();
  const isMe = data?._id === id;
  return (
    <div className={styles.profileHeader}>
      {profilePage && (
        <div className={styles.profileBreadcrumbs}>
          <HomeFilled />
          {isMe ? " Мой профиль" : " Профиль / " + profile.fullName}
        </div>
      )}

      {usersPage && (
        <div className={styles.profileBreadcrumbs}>
          <HomeFilled /> Пользователи
        </div>
      )}

      {chatPage && <Status />}
    </div>
  );
};

export default Header;
