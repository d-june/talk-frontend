import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { getPartnerInDialog } from "../../utils/helpers/getPartner";

import classNames from "classnames";
import styles from "./Status.module.scss";
import { UserInfoType } from "../../redux/slices/users/types";

const Status: FC = () => {
  const { currentDialogId, items } = useSelector(
    (state: RootState) => state.dialogs
  );
  const { data } = useSelector((state: RootState) => state.me);

  let partner = {} as UserInfoType | null;
  partner = getPartnerInDialog(currentDialogId, items, data);

  if (!items.length || !currentDialogId) {
    return null;
  }

  return (
    <div className={styles.chatDialogHeaderBody}>
      <b className={styles.chatDialogHeaderUserName}>{partner?.fullName}</b>
      <div className={styles.chatDialogHeaderStatus}>
        <span
          className={classNames(
            styles.status,
            partner?.isOnline ? styles.statusOnline : ""
          )}
        >
          {partner?.isOnline ? "онлайн" : "офлайн"}
        </span>
      </div>
    </div>
  );
};

export default Status;
