import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CreateDialogForm, Dialogs, Empty, UserInfo } from "../index";
import { selectDialogsData } from "../../redux/slices/dialogs/selectors";

import { FormOutlined } from "@ant-design/icons";
import { Input } from "antd";

import styles from "./Sidebar.module.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { getDialogs } from "../../redux/slices/dialogs/asyncActions";
import { RootState } from "../../redux/store";
import { updateReaded } from "../../redux/slices/dialogs/slice";
import socket from "../../socket/socket";
import { DialogType } from "../../redux/slices/dialogs/types";

type PropsType = {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useSelector(selectDialogsData);
  const { token, data } = useSelector((state: RootState) => state.me);
  const { currentDialogId } = useSelector(selectDialogsData);

  const [filtered, setFilteredItems] = useState(Array.from(items));
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);

  const lastMessages = items.filter((item) => {
    return item.lastMessage;
  });

  const fetchDialogs = () => {
    dispatch(getDialogs(token));
  };

  const updateReadedStatus = () => {
    if (data?._id) {
      const id = data._id;
      dispatch(updateReaded({ id, currentDialogId }));
    }
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
  }, [items.length, lastMessages]);

  const onChangeInput = (value: string) => {
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
          setFilteredItems={setFilteredItems}
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
