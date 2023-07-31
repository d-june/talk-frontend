import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";

import { RootState } from "../../redux/store";

import { Header, Posts, UserProfile } from "../../components";
import MainLayout from "../../components/layouts/MainLayout";

import styles from "./Profile.module.scss";

const Profile: FC = () => {
  const [pageHeight, setPageHeight] = useState(window.innerHeight - 70);
  const { data } = useAppSelector((state: RootState) => state.me);
  const { id } = useParams();
  const isMe = data?._id === id || id === undefined;
  const onResizePage = () => {
    setPageHeight(window.innerHeight - 70);
  };

  useEffect(() => {
    window.addEventListener("resize", onResizePage);
    return () => {
      window.removeEventListener("resize", onResizePage);
    };
  }, [window.innerHeight]);

  return (
    <MainLayout className="profile">
      <div className={styles.profileContainer}>
        <Header profilePage />
        <div className={styles.profileMain} style={{ height: pageHeight }}>
          <UserProfile isMe={isMe} id={id ? id : data?._id} />
          <Posts isMe={isMe} id={id ? id : data?._id} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
