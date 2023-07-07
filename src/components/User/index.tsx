import styles from "./User.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { format, isToday } from "date-fns";
import { UserInfoType } from "../../redux/slices/users/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { findDialogId } from "../../redux/slices/dialogs/asyncActions";
import { Avatar, Button, CreateDialogForm } from "../index";

const User: FC<UserInfoType> = (user) => {
  const [selectedId, setSelectedId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.dialogs);
  const navigate = useNavigate();

  const getMessageTime = (lastSeen: string) => {
    const lastSeenDate = new Date(lastSeen);
    if (isToday(lastSeenDate)) {
      return format(lastSeenDate, "HH:mm");
    } else {
      return format(lastSeenDate, "dd.MM.yyyy");
    }
  };

  const findDialog = (userId: string, userName: string) => {
    dispatch(findDialogId(userId)).then((data) => {
      if (data.payload.length) {
        navigate(`/dialogs/${data.payload[0]._id}`);
      } else {
        setVisible(true);
      }
    });
    setInputValue(userName);
    setSelectedId(userId);
  };

  return (
    <div className={styles.userWrapper}>
      <CreateDialogForm
        setInputValue={setInputValue}
        inputValue={inputValue}
        selectedId={selectedId}
        visible={visible}
        setVisible={setVisible}
      />
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
        <Button
          size="small"
          disabled={isLoading}
          onClick={() => {
            findDialog(user._id, user.fullName);
          }}
        >
          Написать
        </Button>
      </div>
    </div>
  );
};

export default User;
