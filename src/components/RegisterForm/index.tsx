import React from "react";
import { Link, Navigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

import { register } from "../../redux/slices/me/asyncActions";

import { Button, AuthBlock } from "../index";

import { Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { registrationSuccess, isLoading } = useSelector(
    (state: RootState) => state.me
  );
  const onFinish = (values: any) => {
    dispatch(register(values));
  };
  return (
    <div>
      <div className={styles.topForm}>
        <h2>Регистрация</h2>
        <p>Зарегистрируйтесь для входа в чат</p>
      </div>
      <AuthBlock>
        {!registrationSuccess ? (
          <Form
            name="normal_login"
            className="register-form"
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
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: "Пожалуйста введите имя" }]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Ваше имя"
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
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (
                      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
                    ) {
                      return Promise.reject("Слишком легкий пароль");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Введите пароль"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите пароль",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Введенные пароли не совпадают")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Повторите пароль"
                size="large"
              />
            </Form.Item>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
            >
              Зарегистрироваться
            </Button>
            <Link to="/login" className={styles.loginButton}>
              Войти в аккаунт
            </Link>
          </Form>
        ) : (
          <Navigate to="/register/verify" />
        )}
      </AuthBlock>
    </div>
  );
};

export default RegisterForm;
