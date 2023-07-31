import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { orderBy } from "lodash";

import { DialogType } from "../../../redux/slices/dialogs/types";

import { DialogItem, SpinIcon } from "../../index";

import SkeletonButton from "antd/es/skeleton/Button";
import styles from "./Dialogs.module.scss";

type DialogsProps = {
  items: Array<DialogType>;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const Dialogs: FC<DialogsProps> = ({ items, setSidebarOpen, isLoading }) => {
  const [pageHeight, setPageHeight] = useState(window.innerHeight - 168);

  const onResizePage = () => {
    setPageHeight(window.innerHeight - 168);
  };

  useEffect(() => {
    window.addEventListener("resize", onResizePage);
    return () => {
      window.removeEventListener("resize", onResizePage);
    };
  }, [window.innerHeight]);

  return (
    <div className={styles.dialogs} style={{ height: pageHeight }}>
      {isLoading && !items.length && (
        <SpinIcon tip="Загружаю пользователей..." white />
      )}
      {orderBy(items, ["createdAt"], ["desc"]).map((item) =>
        isLoading && items.length ? (
          <SkeletonButton
            block
            active
            style={{ marginBottom: 10, height: 70, zIndex: 10 }}
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
