import { Button, Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import styles from "../Posts.module.scss";
import { useAppDispatch } from "../../../hooks/hooks";

import { useState } from "react";
import defaultAvatar from "../../../assets/img/cat.jpg";
import { postType } from "../../../redux/slices/posts/types";
import { addPost } from "../../../redux/slices/posts/slice";
import { SendOutlined } from "@ant-design/icons";
const PostsForm = () => {
  // const { photos } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [newPostText, setNewPostText] = useState("");
  const onSubmit = (values: postType) => {
    dispatch(
      addPost({
        userAvatar: defaultAvatar,
        postText: values.postText,
        likesCount: 0,
      })
    );
    setNewPostText("");
  };

  return (
    <>
      <Form
        wrapperCol={{ span: 24 }}
        initialValues={{ postText: newPostText }}
        layout="horizontal"
        onFinish={onSubmit}
        className={styles.postsForm}
      >
        <Row justify="space-between" align="middle">
          <Col span={23}>
            <Form.Item name="postText">
              <TextArea
                size="small"
                value={newPostText}
                onChange={(e) => setNewPostText(e.currentTarget.value)}
              ></TextArea>
            </Form.Item>
          </Col>
          <Col>
            <Button
              htmlType="submit"
              size="small"
              className={styles.sendPostButton}
            >
              <SendOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PostsForm;
