import { useSelector } from "react-redux";
import React, { FC, useEffect } from "react";

import { useAppDispatch } from "../../hooks/hooks";

import {
  ChatInput,
  LoginForm,
  Messages,
  Sidebar,
  Status,
} from "../../components";

import { getMe } from "../../redux/slices/me/asyncActions";
import { getDialogs } from "../../redux/slices/dialogs/asyncActions";
import { selectIsAuth, selectToken } from "../../redux/slices/me/selectors";

import styles from "./Home.module.scss";
import { Navigate } from "react-router-dom";

const Home: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const token = useSelector(selectToken);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe());
    dispatch(getDialogs(token));
  }, [isAuth]);

  return (
    <>
      {isAuth ? (
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
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Home;
