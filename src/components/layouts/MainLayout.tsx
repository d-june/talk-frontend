import React, {
  FC,
  JSXElementConstructor,
  ReactElement,
  useState,
} from "react";
import clsx from "clsx";
import styles from "./MainLayout.module.scss";
import { BurgerIcon, Sidebar } from "../index";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/me/selectors";
import Header from "../Header";
interface MainLayoutProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
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
