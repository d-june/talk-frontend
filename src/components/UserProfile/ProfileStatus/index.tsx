import React, { FC, useEffect, useState } from "react";
import { RootState } from "../../../redux/store";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import {
  getUserStatus,
  updateUserStatus,
} from "../../../redux/slices/profile/asyncActions";

import { Col, Form, Input, Row, Skeleton } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styles from "./ProfileStatus.module.scss";

type PropsType = {
  userId: string;
  isMe: boolean;
};
const ProfileStatus: FC<PropsType> = ({ userId, isMe }) => {
  const [editMode, setEditMode] = useState(false);
  const { profile } = useAppSelector((state: RootState) => state.profile);
  const { isLoadingStatus } = useAppSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserStatus(userId));
  }, [userId, profile.status]);
  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const updateStatus = (values: any) => {
    dispatch(updateUserStatus(values.statusBody));
    deactivateEditMode();
  };

  return (
    <>
      {isLoadingStatus ? (
        <Skeleton.Input style={{ marginTop: 28 }}></Skeleton.Input>
      ) : (
        !editMode && (
          <Row
            className={
              profile.status || isMe ? styles.status : styles.statusIsEmpty
            }
            align="middle"
            gutter={10}
          >
            <Col>
              {profile.status ? (
                profile.status
              ) : (
                <div className={styles.emptyStatus}>
                  {isMe ? (
                    <>Здесь мог бы быть ваш статус...</>
                  ) : (
                    <div className={styles.statusIsEmpty}></div>
                  )}
                </div>
              )}
            </Col>
            {isMe && (
              <Col>
                <EditOutlined
                  className={styles.editButton + " " + styles.editButtonStatus}
                  onClick={activateEditMode}
                />
              </Col>
            )}
          </Row>
        )
      )}
      {editMode && (
        <Form
          className={styles.statusEdit}
          onFinish={updateStatus}
          initialValues={{ statusBody: profile.status }}
        >
          <Form.Item name="statusBody">
            <Input />
          </Form.Item>
          <Form.Item>
            <button
              className={styles.statusButton}
              type="submit"
              onSubmit={updateStatus}
            >
              Изменить статус
            </button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ProfileStatus;
