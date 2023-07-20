import React, { FC } from "react";
import { format } from "date-fns";
import { useAppSelector } from "../../hooks/hooks";

import { RootState } from "../../redux/store";

import { Col } from "antd";
import { EditOutlined, GiftOutlined, HomeOutlined } from "@ant-design/icons";

import styles from "./ProfileInfo.module.scss";

type ProfileInfoProps = {
  onEditMode: () => void;
  isMe: boolean;
};

const ProfileInfo: FC<ProfileInfoProps> = ({ onEditMode, isMe }) => {
  const { profile } = useAppSelector((state: RootState) => state.profile);

  return (
    <>
      <div className={styles.profileInfoContainer}>
        <Col>
          {profile.fullName ? (
            <div className={styles.profileInfoName}>
              <p>{profile.fullName}</p>
              {isMe && (
                <div onClick={onEditMode}>
                  <EditOutlined className={styles.editButton} />
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </Col>
        <div className={`${styles.profileInfoList} ${styles.row}`}>
          <ul>
            {profile.birthday ? (
              <li>
                <GiftOutlined /> День рождения:
                {profile.birthday && (
                  <span>
                    {format(new Date(profile.birthday), "dd.MM.yyyy")}
                  </span>
                )}
              </li>
            ) : (
              ""
            )}
            {profile.city ? (
              <li>
                <HomeOutlined /> Город: <span>{profile.city}</span>
              </li>
            ) : (
              ""
            )}
            {profile.about ? (
              <li>
                Обо мне: <span>{profile.about}</span>
              </li>
            ) : (
              ""
            )}
            {profile.hobbies ? (
              <li>
                Увлечения: <span>{profile.hobbies}</span>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
