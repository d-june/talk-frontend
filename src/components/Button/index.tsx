import { FC, ReactElement } from "react";

import classNames from "classnames";

import { Button as BaseButton } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";

import styles from "./Button.module.scss";

type PropsType = {
  className?: string;
  children: string | ReactElement;

  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  htmlType?: ButtonHTMLType;
  size: SizeType;
  onClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  loading?: boolean;
  isLoading?: boolean;
};
const Button: FC<PropsType> = (props) => {
  return (
    <BaseButton
      className={classNames(styles.button, props.className)}
      {...props}
    />
  );
};

export default Button;
