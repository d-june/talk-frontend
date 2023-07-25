import { FC } from "react";
import classNames from "classnames";

import styles from "./Avatar.module.scss";

type PropsType = {
  _id: string;
  fullName: string;
  avatar?: string | null;
  bigSize?: boolean;
};

const Avatar: FC<PropsType> = ({ _id, fullName, avatar, bigSize }) => {
  if (avatar) {
    return <img src={avatar} alt={`Avatar ${fullName}`} />;
  } else {
    const firstChartFromFullName = fullName[0]?.toUpperCase();
    let color = "#";
    let hash = 0;

    let i;
    let valueColor;
    let strLength;

    if (!fullName) {
      color = color + "333333";
    }

    strLength = fullName.length;

    for (i = 0; i < strLength; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (i = 0; i < 3; i++) {
      valueColor = (hash >> (i * 8)) & 0xff;
      color += ("00" + valueColor.toString(16)).substr(-2);
    }

    return (
      <div
        style={{
          background: `${color}`,
        }}
        className={classNames(styles.avatar, !avatar ? styles.avatarEmpty : "")}
      >
        {bigSize ? fullName.toUpperCase() : firstChartFromFullName}
      </div>
    );
  }
};

export default Avatar;
