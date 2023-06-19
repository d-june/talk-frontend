import { Col, Row } from "antd";

import styles from "./Posts.module.scss";
import { PostsContent, PostsForm } from "../index";
const Posts = () => {
  return (
    <>
      <Row className={styles.postsWrapper}>
        <h2 className={styles.postsTitle}>Посты</h2>
        <Col span={24}>
          <PostsContent />
        </Col>
        <Col span={24}>
          <PostsForm />
        </Col>
      </Row>
    </>
  );
};

export default Posts;
