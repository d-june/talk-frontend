import classNames from "classnames";
// @ts-ignore
import styles from "./Status.module.scss";
import { FC } from "react";

type StatusProps = {
  online: boolean;
};

const Status: FC<StatusProps> = ({ online }) => (
  <span
    className={classNames(styles.status, online ? styles.statusOnline : "")}
  >
    {online ? "онлайн" : "офлайн"}
  </span>
);

export default Status;
