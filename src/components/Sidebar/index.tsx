import { useEffect, useState } from "react";
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

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { items } = useSelector(selectDialogsData);
  const { token } = useSelector((state: RootState) => state.me);

  const [filtered, setFilteredItems] = useState(Array.from(items));
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const fetchDialogs = () => {
    dispatch(getDialogs(token));
  };

  const onChangeInput = (value: any) => {
    setFilteredItems(
      items.filter(
        (dialog) =>
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
    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogs);
      socket.removeListener("SERVER:NEW_MESSAGE", fetchDialogs);
    };
  }, [items]);

  const onShow = () => {
    setVisible(true);
  };

  return (
    <div className={styles.sidebar}>
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
      {filtered.length > 0 ? (
        <Dialogs items={filtered} />
      ) : (
        <Empty description="Ничего не нашлось :(" light />
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
