import { Col, Row } from "antd";

import styles from "./Posts.module.scss";
import { PostsContent, PostsForm } from "../index";
import { FC } from "react";

type PropsType = {
  isMe: boolean;
};
const Posts: FC<PropsType> = ({ isMe }) => {
  return (
    <>
      <div className={styles.postsWrapper}>
        <Col span={24}>
          <PostsContent isMe={isMe} />
        </Col>
        {isMe && (
          <Col span={24}>
            <PostsForm />
          </Col>
        )}
      </div>
    </>
  );
};

export default Posts;
