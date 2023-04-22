import { FormOutlined, TeamOutlined } from "@ant-design/icons";
import { Empty, Input } from "antd";
import { Dialogs } from "../index";

// @ts-ignore
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";
import { selectDialogsData } from "../../redux/slices/dialogs/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { getDialogs } from "../../redux/slices/dialogs/asyncActions";
import dialogs from "../Dialogs";

const Sidebar = () => {
  const { items } = useSelector(selectDialogsData);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");
  const [filtered, setFilteredItems] = useState(Array.from(items));

  const onChangeInput = (value: any) => {
    console.log(
      items[0].user.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0
    );
    setFilteredItems(
      items.filter(
        (dialog) =>
          dialog.user.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );
    setInputValue(value);
  };

  useEffect(() => {
    if (!items.length) {
      dispatch(getDialogs());
    } else {
      setFilteredItems(items);
    }
  }, [items]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarDialogsList}>
          <TeamOutlined />
          <span>Список диалогов</span>
        </div>
        <FormOutlined />
      </div>
      <div className={styles.sidebarSearch}>
        <Input.Search
          placeholder="Поиск среди контактов"
          onChange={(e) => onChangeInput(e.target.value)}
        />
      </div>
      {filtered.length > 0 ? (
        <Dialogs userId="f90721c90de9bd9ef516bea0b184fd30" items={filtered} />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Ничего не найдено("
          className={styles.dialogsEmpty}
        />
      )}
    </div>
  );
};

export default Sidebar;
