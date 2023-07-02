import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth, selectMeData } from "../../redux/slices/me/selectors";
import Button from "../Button";
import {
  UpCircleOutlined,
  DownCircleOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import CatImage from "../../assets/img/cat.jpg";

import styles from "./UserInfo.module.scss";
import { Link } from "react-router-dom";

const UserInfo: FC = () => {
  const userData = useSelector(selectMeData);
  const isAuth = useSelector(selectIsAuth);

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div>
      {isAuth ? (
        <div className={styles.userInfo}>
          <div
            className={styles.userData}
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <div className={styles.userAvatar}>
              <img src={CatImage} alt="default avatar" />
            </div>
            <div className={styles.userName}>
              {userData?.fullName}
              {menuVisible ? <UpCircleOutlined /> : <DownCircleOutlined />}
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
                <li>
                  <Link to="/friends">
                    <TeamOutlined /> Друзья
                  </Link>
                </li>
                <li>
                  <Link to="/dialogs">
                    <WechatOutlined /> Чат
                  </Link>
                </li>
                <li className={styles.userLogOut}>
                  <button>
                    <LogoutOutlined /> Выйти
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Button size="small">Войти</Button>
      )}
    </div>
  );
};

export default UserInfo;
