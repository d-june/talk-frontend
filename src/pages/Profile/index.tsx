import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

import { Header, Posts, SpinIcon, ProfileStatus } from "../../components";
import ProfileInfo from "./ProfileInfo";
import ProfileForm from "./ProfileForm";
import MainLayout from "../../components/layouts/MainLayout";

import {
  getProfile,
  updateAvatar,
  updateProfile,
} from "../../redux/slices/profile/asyncActions";

import { UpdateProfileType } from "../../redux/slices/profile/types";

import styles from "./Profile.module.scss";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import forestImg from "../../assets/img/forest.jpg";
import { Avatar } from "antd";

const Profile: FC = () => {
  const [editMode, setEditMode] = useState(false);

  const { profile, isLoading } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { data } = useAppSelector((state: RootState) => state.me);

  const dispatch = useAppDispatch();

  const { id } = useParams();
  const isMe = data?._id === id;

  useEffect(() => {
    dispatch(getProfile(String(id)));
  }, [
    dispatch,
    id,
    profile.avatar,
    profile.birthday,
    profile.fullName,
    profile.about,
    profile.hobbies,
  ]);

  const onSubmit = (values: UpdateProfileType) => {
    dispatch(updateProfile(values));
    setEditMode(false);
  };

  const editUserAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      dispatch(updateAvatar(e.target.files[0]));
    }
  };

  return (
    <MainLayout className="profile">
      <div className={styles.profileContainer}>
        <Header profilePage />
        <div
          className={styles.profileMain}
          style={{ height: window.innerHeight - 70 }}
        >
          {isLoading ? (
            <SpinIcon tip="Загружаю профиль..." />
          ) : (
            <>
              <div className={styles.profileAbout}>
                <div className={styles.profileBackground}>
                  <img src={forestImg} alt="forest" />
                </div>
                <div className={styles.profileLeft}>
                  <div className={styles.profileImage}>
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="avatar" />
                    ) : (
                      <Avatar size={64} icon={<UserOutlined />} />
                    )}

                    {isMe && (
                      <div className={styles.editAvatarButton}>
                        <label>
                          <EditOutlined />
                          <input type="file" onChange={editUserAvatar} />
                        </label>
                      </div>
                    )}
                  </div>

                  <ProfileStatus userId={String(id)} isMe={isMe} />
                </div>

                <div className={styles.profileContent}>
                  {editMode ? (
                    <ProfileForm onSubmit={onSubmit} />
                  ) : (
                    <ProfileInfo
                      fullName={profile.fullName}
                      birthday={profile.birthday}
                      about={profile.about}
                      city={profile.city}
                      hobbies={profile.hobbies}
                      onEditMode={() => setEditMode(true)}
                      isMe={isMe}
                    />
                  )}
                </div>
              </div>
              <Posts isMe={isMe} />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
