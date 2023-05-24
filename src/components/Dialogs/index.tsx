import { FC } from "react";

import { orderBy } from "lodash";

import { DialogItem } from "../index";

// @ts-ignore
import styles from "./Dialogs.module.scss";
import { dialogType } from "../../redux/slices/dialogs/types";

type DialogsProps = {
  items: Array<dialogType>;
};

const Dialogs: FC<DialogsProps> = ({ items }) => {
  return (
    <div className={styles.dialogs}>
      {orderBy(items, ["createdAt"], ["desc"]).map((item) => (
        <DialogItem key={item._id} {...item} />
      ))}
    </div>
  );
};

export default Dialogs;
