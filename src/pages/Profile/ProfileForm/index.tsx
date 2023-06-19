import { Col, DatePicker, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { FC } from "react";

import { GiftOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../hooks/hooks";
import styles from "../Profile.module.scss";
import { UpdateProfileType } from "../../../redux/slices/profile/types";
import { values } from "lodash";
import { format } from "date-fns";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button } from "../../../components";

type PropsType = {
  onSubmit: (values: UpdateProfileType) => void;
};

const ProfileForm: FC<PropsType> = ({ onSubmit }) => {
  const { profile } = useAppSelector((state) => state.profile);
  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          fullName: profile.fullName,
          birthday: dayjs(new Date(profile.birthday)),
          city: profile.city,
          about: profile.about,
          hobbies: profile.hobbies,
        }}
        layout="horizontal"
        onFinish={onSubmit}
      >
        <Row className={styles.profileInfoContainer}>
          <Row className={`${styles.profileFormName}} ${styles.row}`}>
            <Col span={24}>
              <Form.Item label="Полное имя" name="fullName">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className={`${styles.profileFormBirthday} ${styles.row}`}>
            <Col span={24}>
              <Form.Item label="День рождения" name="birthday">
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row className={`${styles.profileFormCity} ${styles.row}`}>
            <Col span={24}>
              <Form.Item label="Город" name="city">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className={`${styles.profileFormAbout} ${styles.row}`}>
            <Col span={24}>
              <Form.Item label="Обо мне" name="about">
                <TextArea></TextArea>
              </Form.Item>
            </Col>
          </Row>
          <Row className={`${styles.profileFormHobbies} ${styles.row}`}>
            <Col span={24}>
              <Form.Item label="Увлечения" name="hobbies">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row className={styles.row}>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" type="primary" size="small">
                  Сохранить
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Row>
      </Form>
    </>
  );
};

export default ProfileForm;
