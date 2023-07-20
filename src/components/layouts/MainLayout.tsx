import React, { FC, ReactElement, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import clsx from "clsx";

import { selectIsAuth } from "../../redux/slices/me/selectors";
import { BurgerIcon, Sidebar } from "../index";

import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: ReactElement;
  className?: string;
}
const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  const isAuth = useSelector(selectIsAuth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {isAuth ? (
        <section
          className={clsx(styles.wrapper, className)}
          style={{ height: window.innerHeight }}
        >
          <div className={styles.sidebar}>
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
          <div className={styles.main}>
            <div className={styles.content}>{children}</div>
          </div>

          <BurgerIcon
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </section>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default MainLayout;
