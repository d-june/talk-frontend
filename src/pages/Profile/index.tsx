import React, { FC, useEffect, useState } from "react";

import defaultAvatar from "../../assets/img/cat.jpg";
import styles from "./Profile.module.scss";
import { Posts, SpinIcon } from "../../components";
import { useParams } from "react-router-dom";
import { SyncOutlined, HomeFilled, EditOutlined } from "@ant-design/icons";
import ProfileStatus from "../../components/ProfileStatus";
import ProfileInfo from "./ProfileInfo";
import {
  getProfile,
  updateAvatar,
  updateProfile,
} from "../../redux/slices/profile/asyncActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import ProfileForm from "./ProfileForm";
import { UpdateProfileType } from "../../redux/slices/profile/types";
import MainLayout from "../../components/layouts/MainLayout";
const Profile: FC = () => {
  const { profile, isLoading } = useAppSelector(
    (state: RootState) => state.profile
  );

  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  const { data } = useAppSelector((state: RootState) => state.me);

  const { id } = useParams();
  const isMe = data?._id === id;

  useEffect(() => {
    dispatch(getProfile(String(id)));
  }, [editMode, profile.avatar]);

  const onEditMode = () => {
    setEditMode(true);
  };
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
        <div className={styles.profileHeader}>
          <div className={styles.profileBreadcrumbs}>
            <HomeFilled />
            {isMe ? " Мой профиль" : " Профиль / " + profile.fullName}
          </div>
        </div>
        <div className={styles.profileMain}>
          {isLoading ? (
            <SpinIcon tip="Загружаю профиль..." />
          ) : (
            <>
              <div className={styles.profileAbout}>
                <div className={styles.profileLeft}>
                  <div className={styles.profileImage}>
                    <img src={profile.avatar || defaultAvatar} alt="avatar" />

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
                      onEditMode={onEditMode}
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
