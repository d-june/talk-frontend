import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth, selectToken } from "../../redux/slices/me/selectors";
import { getMe } from "../../redux/slices/me/asyncActions";
import { getDialogs } from "../../redux/slices/dialogs/asyncActions";

import defaultAvatar from "../../assets/img/cat.jpg";
import styles from "./Profile.module.scss";
import {
  ChatInput,
  Messages,
  Posts,
  Sidebar,
  Status,
  UserInfo,
} from "../../components";
import { Navigate, useParams } from "react-router-dom";
import { Col, Row } from "antd";
import { SyncOutlined, LoadingOutlined } from "@ant-design/icons";
import ProfileStatus from "../../components/ProfileStatus";
import ProfileInfo from "./ProfileInfo";
import {
  getProfile,
  updateProfile,
} from "../../redux/slices/profile/asyncActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import ProfileForm from "./ProfileForm";
import {
  ProfileType,
  UpdateProfileType,
} from "../../redux/slices/profile/types";
const Profile: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const { profile } = useAppSelector((state: RootState) => state.profile);
  const { isLoading } = useAppSelector((state: RootState) => state.profile);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfile("644bfdeabab5a5f1c7416c4f"));
  }, [
    profile.about,
    profile.city,
    profile.fullName,
    profile.hobbies,
    profile.birthday,
  ]);

  const onEditMode = () => {
    setEditMode(true);
  };
  const onSubmit = (values: UpdateProfileType) => {
    dispatch(updateProfile(values));
    setEditMode(false);
  };

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <section className={styles.profile}>
      <Sidebar />
      <div className={styles.profileContainer}>
        {isLoading ? (
          <SyncOutlined spin className={styles.profileLoading} />
        ) : (
          <div>
            <div className={styles.profileAbout}>
              <div className={styles.profileLeft}>
                <div className={styles.profileImage}>
                  <img src={defaultAvatar} alt="avatar" />
                </div>
                <ProfileStatus userId={String(id)} />
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
                  />
                )}
              </div>
            </div>
            <Posts />
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
