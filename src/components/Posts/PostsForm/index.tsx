import { useState } from "react";

import { useAppDispatch } from "../../../hooks/hooks";
import { sendPost } from "../../../redux/slices/posts/asyncActions";

import { Button } from "../../index";

import TextArea from "antd/es/input/TextArea";
import { SendOutlined } from "@ant-design/icons";
import styles from "../Posts.module.scss";

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

  const handleSendMessage = (e: React.KeyboardEvent) => {
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
