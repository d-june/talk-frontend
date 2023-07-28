import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/hooks";
import { logout } from "../../../redux/slices/me/slice";
import { selectMeData } from "../../../redux/slices/me/selectors";

import { Avatar } from "../../index";
import Button from "../../Button";

import {
  UpCircleOutlined,
  DownCircleOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import styles from "./UserInfo.module.scss";
import SkeletonButton from "antd/es/skeleton/Button";
import { RootState } from "../../../redux/store";

const UserInfo: FC = () => {
  const userData = useSelector(selectMeData);
  const { isAuth, isLoadingMeData } = useSelector(
    (state: RootState) => state.me
  );
  const dispatch = useAppDispatch();

  const [menuVisible, setMenuVisible] = useState(false);
  const handleOutsideClick = (el: any, e: Event) => {
    if (el && !el.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    const el = document.getElementById("userData");

    document.addEventListener("click", handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener("click", handleOutsideClick.bind(this, el));
    };
  }, []);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoadingMeData ? (
        <SkeletonButton
          block
          active
          style={{ height: 50, width: 161, zIndex: 10 }}
        ></SkeletonButton>
      ) : isAuth ? (
        <div className={styles.userInfo}>
          <div
            id="userData"
            className={styles.userData}
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <div className={styles.userAvatar}>
              <Avatar
                _id={userData?._id}
                fullName={userData?.fullName}
                avatar={userData?.avatar}
              />
            </div>
            <div className={styles.userName}>
              <div>{userData?.fullName}</div>
              <div>
                {menuVisible ? <UpCircleOutlined /> : <DownCircleOutlined />}
              </div>
            </div>
          </div>
          {menuVisible && (
            <div className={styles.userMenu}>
              <ul>
                <li>
                  <Link to={`/profile/${userData?._id}`}>
                    <UserOutlined /> Профиль
                  </Link>
                </li>
                <li>
                  <Link to="/users">
                    <TeamOutlined /> Пользователи
                  </Link>
                </li>
                <li className={styles.userChat}>
                  <Link to="/dialogs">
                    <WechatOutlined /> Чат
                  </Link>
                </li>
                <li className={styles.userLogOut} onClick={logOut}>
                  <button>
                    <LogoutOutlined /> Выйти
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Button size="small">
          <Link to="/login">Войти </Link>
        </Button>
      )}
    </div>
  );
};

export default UserInfo;
