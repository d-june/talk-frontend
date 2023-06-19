import { Col, Row } from "antd";

import React, { FC } from "react";
import styles from "../Profile.module.scss";
import { EditOutlined, GiftOutlined, HomeOutlined } from "@ant-design/icons";
import {
  ProfileType,
  UpdateProfileType,
} from "../../../redux/slices/profile/types";
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
}) => {
  return (
    <>
      <Row className={styles.profileInfoContainer}>
        <Row>
          <Row className={styles.row} align="middle" gutter={10}>
            <Col className={styles.profileInfoName}>{fullName}</Col>
            <Col onClick={onEditMode}>
              <EditOutlined className={styles.editButton} />
            </Col>
          </Row>
          <Row className={`${styles.profileInfoList} ${styles.row}`}>
            <ul>
              <li>
                <GiftOutlined /> День рождения:
                {birthday && (
                  <span>{format(new Date(birthday), "dd.MM.yyyy")}</span>
                )}
              </li>
              <li>
                <HomeOutlined /> Город: <span>{city}</span>
              </li>
              <li>
                Обо мне: <span>{about}</span>
              </li>
              <li>
                Увлечения: <span>{hobbies}</span>
              </li>
            </ul>
          </Row>
        </Row>
      </Row>
    </>
  );
};

export default ProfileInfo;
