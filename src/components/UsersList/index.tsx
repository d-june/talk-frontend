import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/slices/users/asyncActions";
import { format, isToday } from "date-fns";
import { Avatar, Button } from "../index";
import styles from "./UsersList.module.scss";
import { Link } from "react-router-dom";

const UsersList = () => {
  const { users } = useAppSelector((state: RootState) => state.users);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const getMessageTime = (lastSeen: string) => {
    const lastSeenDate = new Date(lastSeen);
    if (isToday(lastSeenDate)) {
      return format(lastSeenDate, "HH:mm");
    } else {
      return format(lastSeenDate, "dd.MM.yyyy");
    }
  };

  return (
    <>
      {users.map((user) => {
        return (
          <div className={styles.userWrapper}>
            <Link to={"/profile/" + user._id} className={styles.userAbout}>
              <div className={styles.userAvatar}>
                <Avatar user={user} />
              </div>
              <div className={styles.userName}>{user.fullName}</div>

              <div className={styles.userLastSeen}>
                Был(а) в сети: {getMessageTime(user.lastSeen)}
              </div>
            </Link>
            <div className={styles.userButtons}>
              <Button size="small">Подписаться</Button>
              <Button size="small">Отписаться</Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UsersList;
