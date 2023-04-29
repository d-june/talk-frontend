import { Form, Input, notification } from "antd";
import { LockOutlined, FrownOutlined, UserOutlined } from "@ant-design/icons";
import { AuthBlock, Button } from "../index";
import { Link, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// @ts-ignore
import styles from "./LoginForm.module.scss";
import { RootState, useAppDispatch } from "../../redux/store";
import { getMe, login } from "../../redux/slices/me/asyncActions";
import { useSelector } from "react-redux";

const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.me);
  const [api, contextHolder] = notification.useNotification();
  const { isAuth } = useSelector((state: RootState) => state.me);

  const onFinish = (values: any) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (status === "error") {
      openNotification();
    }
  }, [status]);
  const openNotification = () => {
    api.open({
      message: "Что-то пошло не так.",
      description: "Email или пароль введены неверно.",
      icon: <FrownOutlined style={{ color: "#FF4433" }} />,
    });
  };

  return (
    <div>
      {isAuth ? (
        <Navigate to="/im" />
      ) : (
        <div>
          {contextHolder}
          <div className={styles.topForm}>
            <h2>Войдите в аккаунт</h2>
            <p>Пожалуйста, войдите в свой аккаунт</p>
          </div>
          <AuthBlock>
            <Form
              name="validate_other"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              form={form}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                hasFeedback
                rules={[
                  {
                    type: "email",
                    message: "Перепроверьте пожалуйста e-mail",
                  },
                  {
                    required: true,
                    message: "Пожалуйста введите email",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (
                        !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                      ) {
                        return Promise.resolve();
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Логин"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите пароль",
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Пароль"
                  size="large"
                />
              </Form.Item>

              <Button type="primary" size="large" htmlType="submit">
                Войти в аккаунт
              </Button>
              <Link to="/register" className={styles.registerButton}>
                Зарегистрироваться
              </Link>
            </Form>
          </AuthBlock>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
