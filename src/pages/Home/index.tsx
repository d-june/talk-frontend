import React, { FC } from "react";

import { ChatInput, Messages, Status } from "../../components";

import styles from "./Home.module.scss";
import MainLayout from "../../components/layouts/MainLayout";

const Home: FC = () => {
  return (
    <MainLayout className="home">
      <div className={styles.chatDialog}>
        <div className={styles.chatDialogHeader}>
          <Status />
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
    </MainLayout>
  );
};

export default Home;
