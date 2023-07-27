import { FC } from "react";

import { CheckOutlined } from "@ant-design/icons";
import styles from "./IconReaded.module.scss";

type PropsType = {
  isMe?: boolean;
  isReaded?: boolean;
  className?: string;
};
const IconReaded: FC<PropsType> = ({ isMe, isReaded }) => {
  return (
    <>
      {isMe && isReaded && <CheckOutlined className={styles.messageChecked} />}
      {isMe && !isReaded && (
        <CheckOutlined className={styles.messageNoChecked} />
      )}
    </>
  );
};

export default IconReaded;
