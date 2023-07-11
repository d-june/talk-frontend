import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FC, useState } from "react";

import { Button } from "../index";

import { Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { findUsers } from "../../redux/slices/users/asyncActions";
import { createDialog } from "../../redux/slices/dialogs/asyncActions";

import styles from "./CreateDialogForm.module.scss";
import { useAppDispatch } from "../../hooks/hooks";

type CreateDialogFormType = {
  setVisible: (value: boolean) => void;
  setInputValue: (value: string) => void;
  inputValue: string;
  visible: boolean;
  selectedId?: string;
};
const CreateDialogForm: FC<CreateDialogFormType> = ({
  setInputValue,

  inputValue,
  visible,
  setVisible,

  selectedId,
}) => {
  const dispatch = useAppDispatch();

  const { users } = useSelector((state: RootState) => state.users);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [messageText, setMessageText] = useState("");

  const options = users.map((user) => ({
    value: user._id,
    label: user.fullName,
  }));

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
    if (selectedId) {
      dispatch(createDialog({ selectedUserId: selectedId, messageText }));
    } else {
      dispatch(createDialog({ selectedUserId, messageText }));
    }

    onClose();
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      centered
      open={visible}
      onCancel={onClose}
      className={styles.modal}
      footer={[
        <Button
          disabled={!messageText}
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={onAddDialog}
          size={"small"}
        >
          Создать
        </Button>,
      ]}
    >
      <div>
        <h2>Создать диалог</h2>
      </div>

      <Form className={styles.modalForm}>
        {selectedId ? (
          <div className={styles.selectedUserName}>{inputValue}</div>
        ) : (
          <>
            <h3>Введите имя пользователя или email</h3>

            <Form.Item>
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
                size={"large"}
              />
            </Form.Item>
          </>
        )}

        {selectedId && (
          <Form.Item>
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
  );
};

export default CreateDialogForm;
