import { ChatInput, Messages, Sidebar, Status } from "../../components";

import { EllipsisOutlined } from "@ant-design/icons";

// @ts-ignore
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getMe } from "../../redux/slices/me/asyncActions";

const Home = () => {
  const { isAuth } = useSelector((state: RootState) => state.me);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [isAuth]);

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
