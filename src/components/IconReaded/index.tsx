import { CheckOutlined } from "@ant-design/icons";
// @ts-ignore
import styles from "./IconReaded.module.scss";
import { FC } from "react";

type IconReadedProps = {
  isMe?: boolean;
  isReaded?: boolean;
  className?: string;
};
const IconReaded: FC<IconReadedProps> = ({ isMe, isReaded }) => {
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
