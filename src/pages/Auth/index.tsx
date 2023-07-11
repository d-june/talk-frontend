import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { LoginForm, RegisterForm } from "../../components";
import styles from "./Auth.module.scss";

const Auth: FC = () => {
  const location = useLocation();
  return (
    <section className={styles.auth}>
      {location.pathname === "/login" && <LoginForm />}
      {location.pathname === "/register" && <RegisterForm />}
    </section>
  );
};

export default Auth;
