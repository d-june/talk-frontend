import { FC } from "react";

import { useAppDispatch } from "../../../../hooks/hooks";
import { postType } from "../../../../redux/slices/posts/types";

import { getTime } from "../../../../utils/helpers/getTime";

import {
  deletePost,
  getPosts,
  setLikesCount,
} from "../../../../redux/slices/posts/asyncActions";

import Avatar from "../../../Avatar";

import { DeleteOutlined, HeartFilled, LikeOutlined } from "@ant-design/icons";
import styles from "../../Posts.module.scss";

type PropsType = {
  isMe: boolean;
  post: postType;
  id: string | undefined;
};

const Post: FC<PropsType> = ({ post, isMe, id }) => {
  const dispatch = useAppDispatch();

  const updateLikesToggle = (
    postId: string,
    likesCount: number,
    liked: boolean
  ) => {
    dispatch(setLikesCount({ postId, likesCount, liked }));
    dispatch(getPosts(String(id)));
  };

  const onRemovePost = (postId: string) => {
    if (window.confirm("Вы действительно хотите удалить этот пост?")) {
      if (postId != null) {
        dispatch(deletePost(postId));
      }
    }
  };
  return (
    <>
      <div className={styles.postContainer} key={post._id}>
        <div className={styles.postTop}>
          <div className={styles.postAvatar}>
            <Avatar
              _id={post.user._id}
              fullName={post.user.fullName}
              avatar={post.user.avatar}
            />
          </div>
          <div className={styles.postInfo}>
            <div className={styles.postUserName}>{post.user.fullName}</div>
            <div className={styles.postDate}>{getTime(post.createdAt)}</div>
          </div>
        </div>

        <div className={styles.postContent}>
          <div>{post.text}</div>
          {isMe && (
            <div
              className={styles.deletePost}
              onClick={() => onRemovePost(post._id)}
            >
              <DeleteOutlined />
            </div>
          )}

          <div>
            {post.liked ? (
              <div
                className={styles.postLikes}
                onClick={() =>
                  updateLikesToggle(post._id, post.likes - 1, post.liked)
                }
              >
                <HeartFilled className={styles.postLikesHeart} />
                <div>{post.likes}</div>
              </div>
            ) : (
              <div
                className={styles.postLikes}
                onClick={() =>
                  updateLikesToggle(post._id, post.likes + 1, post.liked)
                }
              >
                <LikeOutlined />
                <div>{post.likes}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
