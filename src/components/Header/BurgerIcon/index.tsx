import styles from "./BurgerIcon.module.scss";
import React, { Dispatch, FC, SetStateAction } from "react";

type PropsType = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const BurgerIcon: FC<PropsType> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={
        sidebarOpen
          ? styles.burgerBtn + " " + styles.sidebarOpen
          : styles.burgerBtn
      }
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <span></span>
    </div>
  );
};

export default BurgerIcon;
