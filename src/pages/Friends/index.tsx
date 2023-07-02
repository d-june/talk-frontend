import { FC } from "react";
import styles from "../Home/Home.module.scss";
import { Sidebar } from "../../components";

const Friends: FC = () => {
  return (
    <section className={styles.home}>
      <div className={styles.chat}>
        <Sidebar />
        <div className={styles.profile}>Friends</div>
      </div>
    </section>
  );
};

export default Friends;
