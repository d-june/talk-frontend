import { FC } from "react";
import classNames from "classnames";
import emptyIcon from "../../assets/img/empty.svg";
import styles from "./Empty.module.scss";

type EmptyType = {
  description: string;
  light?: boolean;
};

const Empty: FC<EmptyType> = ({ description, light }) => {
  return (
    <div
      className={classNames(
        styles.emptyBlockBody,
        light ? styles.emptyBlockBodyLight : ""
      )}
    >
      <img src={emptyIcon} className={styles.emptyBlockImage} />
      <p>{description}</p>
    </div>
  );
};

export default Empty;
