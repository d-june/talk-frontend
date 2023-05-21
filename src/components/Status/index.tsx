import classNames from "classnames";
// @ts-ignore
import styles from "./Status.module.scss";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Status = () => {
  const { currentDialogId, items } = useSelector(
    (state: RootState) => state.dialogs
  );
  const { data } = useSelector((state: RootState) => state.me);

  if (!items.length || !currentDialogId) {
    return null;
  }

  const currentDialogObj = items.filter(
    (dialog) => dialog._id === currentDialogId
  )[0];
  let partner = {} as any;

  if (data && currentDialogObj.author._id === data._id) {
    partner = currentDialogObj.partner;
  } else {
    partner = currentDialogObj.author;
  }

  if (!items.length || !currentDialogId) {
    return null;
  }

  return (
    <div className={styles.chatDialogHeaderBody}>
      <b className={styles.chatDialogHeaderUserName}>{partner.fullName}</b>
      <div className={styles.chatDialogHeaderStatus}>
        <span
          className={classNames(
            styles.status,
            partner.isOnline ? styles.statusOnline : ""
          )}
        >
          {partner.isOnline ? "онлайн" : "офлайн"}
        </span>
      </div>
    </div>
  );
};

export default Status;
