import { FC } from "react";

import styles from "./AuthBlock.module.scss";

type PropsType = {
  children: React.ReactElement;
};
const AuthBlock: FC<PropsType> = ({ children }) => {
  return <div className={styles.loginBlock}>{children}</div>;
};

export default AuthBlock;
