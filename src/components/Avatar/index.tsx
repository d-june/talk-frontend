import { generateAvatarFromHash } from "../../utils";
// @ts-ignore
import styles from "./Avatar.module.scss";
import { FC } from "react";
import classNames from "classnames";

type AvatarProps = {
  user: {
    _id: string;
    fullName: string;
    avatar?: string | null;
    isOnline?: boolean;
  };
};

const Avatar: FC<AvatarProps> = ({ user }) => {
  if (user.avatar) {
    return <img src={user.avatar} alt={`Avatar ${user.fullName}`} />;
  } else {
    const { color, colorLighten } = generateAvatarFromHash(user._id);
    const firstChartFromFullName = user.fullName[0].toUpperCase();
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
        }}
        className={classNames(
          styles.avatar,
          !user.avatar ? styles.avatarEmpty : ""
        )}
      >
        {firstChartFromFullName}
      </div>
    );
  }
};

export default Avatar;
