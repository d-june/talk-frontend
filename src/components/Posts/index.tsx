import { FC } from "react";

import { PostsContent, PostsForm } from "../index";

import { Col } from "antd";
import styles from "./Posts.module.scss";

type PropsType = {
  id?: string;
  isMe: boolean;
};
const Posts: FC<PropsType> = ({ isMe, id }) => {
  return (
    <>
      <div className={styles.postsWrapper}>
        <Col span={24}>
          <PostsContent isMe={isMe} id={id} />
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
