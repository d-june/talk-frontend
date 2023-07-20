import React, { FC } from "react";
import ContentLoader from "react-content-loader";

import styles from "./ProfileLoader.scss";

const ProfileLoader: FC = (props) => (
  <ContentLoader
    speed={5}
    width={600}
    height={410}
    viewBox="0 0 600 410"
    backgroundColor="#494544"
    foregroundColor="#454140"
    className={styles.profileLoader}
    {...props}
  >
    <circle className={styles.loaderAvatar} />
    <rect
      x="67"
      y="375"
      rx="8"
      ry="8"
      width="219"
      height="31"
      className={styles.loaderStatus}
    />
    <rect
      x="385"
      y="160"
      rx="10"
      ry="10"
      width="170"
      height="20"
      className={styles.loaderStatus}
    />
    <rect
      x="385"
      y="197"
      rx="10"
      ry="10"
      width="166"
      height="20"
      className={styles.loaderName}
    />
    <rect
      x="385"
      y="233"
      rx="10"
      ry="10"
      width="200"
      height="20"
      className={styles.loaderCity}
    />
    <rect
      x="385"
      y="269"
      rx="10"
      ry="10"
      width="165"
      height="20"
      className={styles.loaderAbout}
    />
    <rect
      x="385"
      y="105"
      rx="10"
      ry="10"
      width="110"
      height="30"
      className={styles.loaderAvatar}
    />
  </ContentLoader>
);

export default ProfileLoader;
