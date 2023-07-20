import React, { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

import { Header, Posts, UserProfile } from "../../components";
import MainLayout from "../../components/layouts/MainLayout";

import styles from "./Profile.module.scss";

const Profile: FC = () => {
  const { data } = useAppSelector((state: RootState) => state.me);
  const { id } = useParams();
  const isMe = data?._id === id;

  return (
    <MainLayout className="profile">
      <div className={styles.profileContainer}>
        <Header profilePage />
        <div
          className={styles.profileMain}
          style={{ height: window.innerHeight - 70 }}
        >
          <UserProfile isMe={isMe} id={id} />
          <Posts isMe={isMe} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
