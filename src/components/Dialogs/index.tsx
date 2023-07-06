import { Dispatch, FC, SetStateAction } from "react";

import { orderBy } from "lodash";

import { DialogItem } from "../index";

import { DialogType } from "../../redux/slices/dialogs/types";

import styles from "./Dialogs.module.scss";

type DialogsProps = {
  items: Array<DialogType>;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const Dialogs: FC<DialogsProps> = ({ items, setSidebarOpen }) => {
  return (
    <div className={styles.dialogs}>
      {orderBy(items, ["createdAt"], ["desc"]).map((item) => (
        <DialogItem key={item._id} {...item} setSidebarOpen={setSidebarOpen} />
      ))}
    </div>
  );
};

export default Dialogs;
