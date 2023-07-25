import { FC } from "react";

import styles from "./AuthBlock.module.scss";

type LoginBlockProps = {
  children: React.ReactElement;
};
const AuthBlock: FC<LoginBlockProps> = ({ children }) => {
  return <div className={styles.loginBlock}>{children}</div>;
};

export default AuthBlock;
