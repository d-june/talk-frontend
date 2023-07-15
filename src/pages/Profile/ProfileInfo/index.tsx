import { Col, Row } from "antd";

import React, { FC } from "react";
import styles from "../Profile.module.scss";
import { EditOutlined, GiftOutlined, HomeOutlined } from "@ant-design/icons";
import { UpdateProfileType } from "../../../redux/slices/profile/types";
import { format } from "date-fns";

type onEditMode = {
  onEditMode: () => void;
};

const ProfileInfo: FC<UpdateProfileType & onEditMode> = ({
  fullName,
  birthday,
  city,
  about,
  hobbies,
  onEditMode,
  isMe,
}) => {
  return (
    <>
      <div className={styles.profileInfoContainer}>
        <Col>
          {fullName ? (
            <div className={styles.profileInfoName}>
              <p>{fullName}</p>
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
            {birthday ? (
              <li>
                <GiftOutlined /> День рождения:
                {birthday && (
                  <span>{format(new Date(birthday), "dd.MM.yyyy")}</span>
                )}
              </li>
            ) : (
              ""
            )}
            {city ? (
              <li>
                <HomeOutlined /> Город: <span>{city}</span>
              </li>
            ) : (
              ""
            )}
            {about ? (
              <li>
                Обо мне: <span>{about}</span>
              </li>
            ) : (
              ""
            )}
            {hobbies ? (
              <li>
                Увлечения: <span>{hobbies}</span>
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
