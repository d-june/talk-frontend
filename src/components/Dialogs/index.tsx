import { Dispatch, FC, SetStateAction } from "react";

import { orderBy } from "lodash";

import { DialogItem } from "../index";

import { DialogType } from "../../redux/slices/dialogs/types";

import styles from "./Dialogs.module.scss";
import SkeletonButton from "antd/es/skeleton/Button";

type DialogsProps = {
  items: Array<DialogType>;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const Dialogs: FC<DialogsProps> = ({ items, setSidebarOpen, isLoading }) => {
  return (
    <div className={styles.dialogs}>
      {orderBy(items, ["createdAt"], ["desc"]).map((item) =>
        isLoading ? (
          <SkeletonButton
            block
            active
            style={{ marginBottom: 20, height: 60, zIndex: 10 }}
            key={item._id}
          ></SkeletonButton>
        ) : (
          <DialogItem
            key={item._id}
            {...item}
            isLoading={isLoading}
            setSidebarOpen={setSidebarOpen}
          />
        )
      )}
    </div>
  );
};

export default Dialogs;
