import { FC } from "react";

import classNames from "classnames";

import { SizeType } from "antd/es/config-provider/SizeContext";
import { Button as BaseButton } from "antd";

// @ts-ignore
import styles from "./Button.module.scss";
import { ButtonHTMLType } from "antd/es/button";

type ButtonProps = {
  className?: string;
  children: string;

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
};
const Button: FC<ButtonProps> = (props) => {
  return (
    <BaseButton
      className={classNames(styles.button, props.className)}
      {...props}
    />
  );
};

export default Button;
