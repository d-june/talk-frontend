import { FC } from "react";

import { SmileOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "./SpinIcon.module.scss";

type PropsType = {
  tip: string;
  white?: boolean;
};

const SpinIcon: FC<PropsType> = ({ tip, white }) => {
  const antIcon = <SmileOutlined style={{ fontSize: 40 }} spin />;
  return (
    <div
      className={
        white ? styles.spinIcon + " " + styles.spinIconWhite : styles.spinIcon
      }
    >
      <Spin size="large" tip={tip} indicator={antIcon}></Spin>;
    </div>
  );
};

export default SpinIcon;
