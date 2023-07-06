import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../redux/store";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getAllUsers } from "../../redux/slices/users/asyncActions";
import { format, isToday } from "date-fns";
import { Avatar, Button, CreateDialogForm } from "../index";
import styles from "./UsersList.module.scss";
import {
  Link,
  Navigate,
  NavigateFunction,
  useNavigate,
} from "react-router-dom";
import socket from "../../socket/socket";
import { setCurrentDialogId } from "../../redux/slices/dialogs/slice";
import { useSelector } from "react-redux";
import { selectDialogsData } from "../../redux/slices/dialogs/selectors";
import {
  createDialog,
  findDialogId,
} from "../../redux/slices/dialogs/asyncActions";
import { Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import User from "./User";
import { UserInfoType } from "../../redux/slices/users/types";

const UsersList = () => {
  const { users } = useAppSelector((state: RootState) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      {users.map((user) => {
        return (
          <>
            <User {...user} />
          </>
        );
      })}
    </>
  );
};

export default UsersList;
