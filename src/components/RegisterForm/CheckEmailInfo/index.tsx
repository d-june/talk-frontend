import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/hooks";

import { verifyHash } from "../../../redux/slices/me/asyncActions";

import { Button } from "../../index";

import { Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import styles from "./CheckEmailInfo.module.scss";

const CheckEmailInfo = () => {
  const { accountVerified } = useSelector((state: RootState) => state.me);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hash = location.search.split("hash=")[1];

  const renderTextInfo = (
    hash: string,
    accountVerified: string | undefined
  ) => {
    if (hash) {
      if (accountVerified === "success") {
        return {
          status: "success" as ResultStatusType,
          message: "Аккаунт успешно подтвержден",
        };
      } else {
        return {
          status: "error" as ResultStatusType,
          message: "Ошибка при подтверждении аккаута",
        };
      }
    } else {
      return {
        status: "success" as ResultStatusType,
        message: "Ссылка с подтверждением аккаунта отправлена на E-Mail",
      };
    }
  };

  const info = renderTextInfo(hash, accountVerified);

  useEffect(() => {
    if (hash) {
      dispatch(verifyHash(hash));
    }
  });

  return (
    <div className={styles.successBlock}>
      <Result
        className={styles.successBlockWrapper}
        status={info.status}
        title={info.status === "success" ? "Готово!" : "Ошибка"}
        subTitle={info.message}
        extra={
          // info.status === "success" &&
          // accountVerified === "success" && [
          <Button size={"small"} onClick={() => navigate("/profile/:id")}>
            Войти в аккаунт
          </Button>
          // ]
        }
      />
    </div>
  );
};

export default CheckEmailInfo;
