import React, { FC, useEffect, useState } from "react";

import { ChatInput, Header, Messages } from "../../components";

import styles from "./Home.module.scss";
import MainLayout from "../../components/layouts/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: FC = () => {
  const { attachments } = useSelector((state: RootState) => state.attachments);
  const [pageHeight, setPageHeight] = useState(window.innerHeight - 70 - 70);

  const onResizePage = () => {
    setPageHeight(window.innerHeight - 70 - 70);
  };

  useEffect(() => {
    window.addEventListener("resize", onResizePage);
    if (attachments.length > 0) {
      setPageHeight(window.innerHeight - 70 - 70 - 120);
    } else {
      setPageHeight(window.innerHeight - 70 - 70);
    }
    return () => {
      window.removeEventListener("resize", onResizePage);
    };
  }, [attachments.length, window.innerHeight]);

  return (
    <MainLayout className="home">
      <div className={styles.chatDialog}>
        <Header chatPage />
        <div className={styles.chatDialogMessagesBlock}>
          <div
            className={styles.chatDialogMessages}
            style={{ height: pageHeight }}
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
