import { Form, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { Button, AuthBlock } from "../index";
import { Link } from "react-router-dom";
import React from "react";

// @ts-ignore
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const success = false;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    alert(values);
  };
  return (
    <div>
      <div className={styles.topForm}>
        <h2>Регистрация</h2>
        <p>Зарегистрируйтесь для входа в чат</p>
      </div>
      <AuthBlock>
        {!success ? (
          <Form
            name="normal_login"
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
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="username"
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
              <Input
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
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Повторите пароль"
                size="large"
              />
            </Form.Item>

            <Button type="primary" size="large" htmlType="submit">
              Зарегистрироваться
            </Button>
            <Link to="/login" className={styles.loginButton}>
              {" "}
              Войти в аккаунт
            </Link>
          </Form>
        ) : (
          <div className={styles.successBlock}>
            <InfoCircleTwoTone
              twoToneColor="rgba(168,17,203,1)"
              className={styles.successIcon}
            />
            <h3>Подтвердите свой аккаунт</h3>
            <p className={styles.successText}>
              Вам на почту отправлено письмо со ссылкой на подтверждение
              аккаунта
            </p>
          </div>
        )}
      </AuthBlock>
    </div>
  );
};

export default RegisterForm;
