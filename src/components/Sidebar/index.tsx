import { FormOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import socket from "../../socket/socket";
import { Dialogs, Empty } from "../index";

// @ts-ignore
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";
import { selectDialogsData } from "../../redux/slices/dialogs/selectors";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  createDialog,
  getDialogs,
} from "../../redux/slices/dialogs/asyncActions";

import { findUsers } from "../../redux/slices/users/asyncActions";

import TextArea from "antd/es/input/TextArea";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { items } = useSelector(selectDialogsData);
  const { token } = useSelector((state: RootState) => state.me);
  const { users } = useSelector((state: RootState) => state.users);

  const [inputValue, setInputValue] = useState("");
  const [filtered, setFilteredItems] = useState(Array.from(items));
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [messageText, setMessageText] = useState("");

  const fetchDialogs = () => {
    dispatch(getDialogs(token));
  };

  const options = users.map((user) => ({
    value: user._id,
    label: user.fullName,
  }));

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

  const onClose = () => {
    setVisible(false);
  };

  const onChangeInputModal = (value: string) => {
    setInputValue(value);
  };

  const onSearch = (value: string) => {
    setIsLoading(true);
    dispatch(findUsers(value));
    setIsLoading(false);
  };

  const onSelectUser = (user: any) => {
    setSelectedUserId(user.value);
  };

  const onChangeTextArea = (e: any) => {
    setMessageText(e.target.value);
  };

  const onAddDialog = () => {
    dispatch(createDialog({ selectedUserId, messageText }));
    onClose();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarDialogsList}>
          <TeamOutlined />
          <span>Список диалогов</span>
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
      <Modal
        title="Создать диалог"
        centered
        visible={visible}
        footer={[
          <Button key="back" onClick={onClose}>
            Закрыть
          </Button>,
          <Button
            disabled={!messageText}
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onAddDialog}
          >
            Создать
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Введите имя пользователя или email">
            <Select
              showSearch
              value={inputValue}
              placeholder="Найти пользователя"
              style={{ width: "100%" }}
              labelInValue
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={onSearch}
              onChange={onChangeInputModal}
              onSelect={(user) => onSelectUser(user)}
              notFoundContent={null}
              options={options}
            />
          </Form.Item>
          {selectedUserId && (
            <Form.Item label="Введите текст сообщения">
              <TextArea
                placeholder="Введите текст сообщения"
                autoSize={{ minRows: 2, maxRows: 6 }}
                onChange={onChangeTextArea}
                value={messageText}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Sidebar;
