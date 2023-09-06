import React, { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { RootState } from "../../redux/store";
import { UpdateProfileType } from "../../redux/slices/profile/types";

import { ProfileForm, ProfileInfo, ProfileStatus } from "../index";

import {
  getProfile,
  updateAvatar,
  updateProfile,
} from "../../redux/slices/profile/asyncActions";

import { Avatar, Skeleton } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./UserProfile.module.scss";
import forestImg from "../../assets/img/forest.jpg";
import { getPosts } from "../../redux/slices/posts/asyncActions";
import { getMe } from "../../redux/slices/me/asyncActions";

type PropsType = {
  isMe: boolean;
  id: string | undefined;
};

const UserProfile: FC<PropsType> = ({ isMe, id }) => {
  const [editMode, setEditMode] = useState(false);
  const { profile, isLoading } = useAppSelector(
    (state: RootState) => state.profile
  );

  const dispatch = useAppDispatch();

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
      dispatch(updateAvatar(e.target.files[0])).then(() => {
        dispatch(getProfile(String(id)));
        dispatch(getPosts(String(id)));
        dispatch(getMe());
      });

      console.log(String(id));
    }
  };

  return (
    <div className={styles.profileAbout}>
      <div className={styles.profileBackground}>
        <img src={forestImg} alt="forest" />
      </div>

      {isLoading ? (
        <div className={styles.skeleton}>
          <div className={styles.skeletonLeft}>
            <Skeleton.Image
              className={styles.skeletonImage}
              style={{ width: 350, height: 350, borderRadius: 200 }}
              active
            ></Skeleton.Image>
            <Skeleton.Input active style={{ width: 220 }}></Skeleton.Input>
          </div>
          <div className={styles.skeletonRight}>
            <Skeleton
              active
              avatar={false}
              title={{ width: 150 }}
              paragraph={{ rows: 4, width: [240, 230, 300, 200] }}
            />
          </div>
        </div>
      ) : (
        <>
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
              <ProfileInfo onEditMode={() => setEditMode(true)} isMe={isMe} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
