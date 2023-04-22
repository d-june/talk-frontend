import { ChatInput, Messages, Sidebar, Status } from "../../components";

import { EllipsisOutlined } from "@ant-design/icons";

// @ts-ignore
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <section className={styles.home}>
      <div className={styles.chat}>
        <Sidebar />
        <div className={styles.chatDialog}>
          <div className={styles.chatDialogHeader}>
            <div className={styles.chatDialogHeaderCenter}>
              <b className={styles.chatDialogHeaderUserName}>Somebody</b>
              <div className={styles.chatDialogHeaderStatus}>
                <Status online={true} />
              </div>
            </div>
            <EllipsisOutlined />
          </div>
          <div className={styles.chatDialogMessagesBlock}>
            <div className={styles.chatDialogMessages}>
              <Messages />
            </div>

            <div className={styles.chatDialogInput}>
              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
