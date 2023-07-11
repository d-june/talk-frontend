import { Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import styles from "../Posts.module.scss";
import { useAppDispatch } from "../../../hooks/hooks";

import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { sendPost } from "../../../redux/slices/posts/asyncActions";
import { Button } from "../../index";
const PostsForm = () => {
  const dispatch = useAppDispatch();
  const [newPostText, setNewPostText] = useState("");
  const onSubmit = () => {
    if (!newPostText) {
      return;
    }
    dispatch(sendPost(newPostText));
    setNewPostText("");
  };

  const handleSendMessage = (e: any) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <>
      <div className={styles.postsForm}>
        <TextArea
          size="small"
          onKeyUp={handleSendMessage}
          value={newPostText}
          onChange={(e) => setNewPostText(e.currentTarget.value)}
          placeholder="Написать пост..."
        ></TextArea>

        <Button onClick={onSubmit} size="small">
          <SendOutlined />
        </Button>
      </div>
    </>
  );
};

export default PostsForm;
