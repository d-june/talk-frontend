import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";

import { UserInfoType } from "../../redux/slices/users/types";

import { findDialogId } from "../../redux/slices/dialogs/asyncActions";
import { Avatar, Button, CreateDialogForm } from "../index";

import styles from "./User.module.scss";
import { getTime } from "../../utils/helpers/getTime";

const User: FC<UserInfoType> = (user) => {
  const [selectedId, setSelectedId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.dialogs);
  const navigate = useNavigate();

  const findDialog = (userId: string, userName: string) => {
    dispatch(findDialogId(userId)).then((data: any) => {
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
          <Avatar
            _id={user._id}
            fullName={user.fullName}
            avatar={user.avatar}
          />
        </div>
        <div className={styles.userName}>{user.fullName}</div>

        <div className={styles.userLastSeen}>
          Был(а) в сети: {getTime(user.lastSeen)}
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
