import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth, selectToken } from "../../redux/slices/me/selectors";
import { getMe } from "../../redux/slices/me/asyncActions";
import { getDialogs } from "../../redux/slices/dialogs/asyncActions";
import styles from "../Home/Home.module.scss";
import { Sidebar } from "../../components";
import { useAppDispatch } from "../../hooks/hooks";

const Friends: FC = () => {
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
        <div className={styles.profile}>Друзья</div>
      </div>
    </section>
  );
};

export default Friends;
