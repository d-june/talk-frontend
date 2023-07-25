import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { useAppDispatch } from "../../hooks/hooks";

import socket from "../../socket/socket";
import { CreateDialogForm, Dialogs, Empty, UserInfo } from "../index";
import { selectDialogsData } from "../../redux/slices/dialogs/selectors";

import { getDialogs } from "../../redux/slices/dialogs/asyncActions";

import { FormOutlined } from "@ant-design/icons";
import { Input } from "antd";

import styles from "./Sidebar.module.scss";
import { updateReaded } from "../../redux/slices/dialogs/slice";

type PropsType = {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useSelector(selectDialogsData);
  const { token, data } = useSelector((state: RootState) => state.me);
  const { currentDialogId } = useSelector((state: RootState) => state.dialogs);

  const [filtered, setFilteredItems] = useState(Array.from(items));
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const fetchDialogs = () => {
    dispatch(getDialogs(token));
  };

  const updateReadedStatus = () => {
    if (data?._id) {
      const id = data._id;
      dispatch(updateReaded({ id, currentDialogId }));
    }
  };

  const onChangeInput = (value: any) => {
    setFilteredItems(
      items.filter(
        (dialog) =>
          dialog.partner &&
          dialog.partner.fullName.toLowerCase().indexOf(value.toLowerCase()) >=
            0
      )
    );
    setInputValue(value);
  };

  useEffect(() => {
    if (!items.length) {
      fetchDialogs();
    } else {
      setFilteredItems(items);
    }
    socket.on("SERVER:DIALOG_CREATED", fetchDialogs);
    socket.on("SERVER:NEW_MESSAGE", fetchDialogs);
    socket.on("SERVER:MESSAGES_READED", updateReadedStatus);
    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogs);
      socket.removeListener("SERVER:NEW_MESSAGE", fetchDialogs);
    };
  }, [items.length]);

  const onShow = () => {
    setVisible(true);
  };

  return (
    <div
      className={
        sidebarOpen ? styles.sidebar + " " + styles.sidebarOpen : styles.sidebar
      }
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarDialogsList}>
          <UserInfo />
        </div>
        <button onClick={onShow}>
          <FormOutlined />
        </button>
      </div>
      <div className={styles.sidebarSearch}>
        <Input.Search
          placeholder="Поиск среди контактов"
          onChange={(e) => onChangeInput(e.target.value)}
        />
      </div>
      {filtered.length < 0 && !isLoading ? (
        <Empty description="Ничего не нашлось :(" light />
      ) : (
        <Dialogs
          items={filtered}
          isLoading={isLoading}
          setSidebarOpen={setSidebarOpen}
        />
      )}
      <CreateDialogForm
        setInputValue={setInputValue}
        setVisible={setVisible}
        inputValue={inputValue}
        visible={visible}
      />
    </div>
  );
};

export default Sidebar;
