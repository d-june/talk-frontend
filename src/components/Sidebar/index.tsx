import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket/socket";

import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/hooks";
import { getDialogs } from "../../redux/slices/dialogs/asyncActions";

import { CreateDialogForm, Dialogs, Empty, UserInfo } from "../index";
import { selectDialogsData } from "../../redux/slices/dialogs/selectors";

import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import styles from "./Sidebar.module.scss";

type PropsType = {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useSelector(selectDialogsData);
  const { token } = useSelector((state: RootState) => state.me);

  const [filtered, setFilteredItems] = useState(Array.from(items));
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);

  const fetchDialogs = () => {
    dispatch(getDialogs(token));
  };

  useEffect(() => {
    fetchDialogs();

    socket.on("SERVER:DIALOG_CREATED", fetchDialogs);
    socket.on("SERVER:NEW_MESSAGE", fetchDialogs);
    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogs);
      socket.removeListener("SERVER:NEW_MESSAGE", fetchDialogs);
    };
  }, []);

  useEffect(() => {
    if (items.length) {
      onChangeInput();
    }
  }, [items]);

  const onShow = () => {
    setVisible(true);
  };

  const onChangeInput = (value = "") => {
    setFilteredItems(
      items.filter(
        (dialog) =>
          dialog.author.fullName.toLowerCase().indexOf(value.toLowerCase()) >=
            0 ||
          (dialog.partner &&
            dialog.partner.fullName
              .toLowerCase()
              .indexOf(value.toLowerCase()) >= 0)
      )
    );

    setInputValue(value);
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
        <Input
          placeholder="Поиск среди контактов"
          onChange={(e) => onChangeInput(e.target.value)}
          prefix={<SearchOutlined />}
        />
      </div>
      {filtered.length <= 0 ? (
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
