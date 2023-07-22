import React, { FC, useEffect, useState } from "react";

import { ChatInput, Header, Messages } from "../../components";

import styles from "./Home.module.scss";
import MainLayout from "../../components/layouts/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: FC = () => {
  const { attachments } = useSelector((state: RootState) => state.attachments);
  const [height, setHeight] = useState(window.innerHeight - 70 - 70);

  useEffect(() => {
    if (attachments.length > 0) {
      setHeight(window.innerHeight - 70 - 70 - 120);
    } else {
      setHeight(window.innerHeight - 70 - 70);
    }
  }, [attachments.length]);

  return (
    <MainLayout className="home">
      <div className={styles.chatDialog}>
        <Header chatPage />
        <div className={styles.chatDialogMessagesBlock}>
          <div className={styles.chatDialogMessages} style={{ height: height }}>
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
