import React, { FC } from "react";

import { ChatInput, Header, Messages, Status } from "../../components";

import styles from "./Home.module.scss";
import MainLayout from "../../components/layouts/MainLayout";

const Home: FC = () => {
  return (
    <MainLayout className="home">
      <div className={styles.chatDialog}>
        <Header chatPage />
        <div className={styles.chatDialogMessagesBlock}>
          <div
            className={styles.chatDialogMessages}
            style={{ height: window.innerHeight - 70 - 70 }}
          >
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
