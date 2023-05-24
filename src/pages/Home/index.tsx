import { ChatInput, Messages, Sidebar, Status } from "../../components";

import { EllipsisOutlined } from "@ant-design/icons";

// @ts-ignore
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getMe } from "../../redux/slices/me/asyncActions";
import { getDialogs } from "../../redux/slices/dialogs/asyncActions";
import { selectIsAuth, selectToken } from "../../redux/slices/me/selectors";

const Home = () => {
  const isAuth = useSelector(selectIsAuth);
  const token = useSelector(selectToken);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe());
    dispatch(getDialogs(token));
  }, [isAuth]);

  return (
    <section className={styles.home}>
      <div className={styles.chat}>
        <Sidebar />
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
      </div>
    </section>
  );
};

export default Home;
