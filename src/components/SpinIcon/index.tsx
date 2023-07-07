import { SmileOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "./SpinIcon.module.scss";
import { FC } from "react";

type PropsType = {
  tip: string;
};

const SpinIcon: FC<PropsType> = ({ tip }) => {
  const antIcon = <SmileOutlined style={{ fontSize: 40 }} spin />;
  return (
    <div className={styles.spinIcon}>
      <Spin size="large" tip={tip} indicator={antIcon}></Spin>;
    </div>
  );
};

export default SpinIcon;
