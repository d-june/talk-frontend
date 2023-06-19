import { FC } from "react";
import { Sidebar, UsersList } from "../../components";
import styles from "./Users.module.scss";

const Users: FC = () => {
  return (
    <section className={styles.users}>
      <Sidebar />
      <div className={styles.usersList}>
        <UsersList />
      </div>
    </section>
  );
};

export default Users;
