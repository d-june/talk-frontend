import React from "react";
import { LoginForm, RegisterForm } from "../../components";
// @ts-ignore
import styles from "./Auth.module.scss";
import { Route, Routes, useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  return (
    <section className={styles.auth}>
      {location.pathname === "/login" && <LoginForm />}
      {location.pathname === "/register" && <RegisterForm />}
    </section>
  );
};

export default Auth;
