import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import defaultAvatar from "../../../assets/img/cat.jpg";
import { LikeOutlined, DeleteOutlined, HeartFilled } from "@ant-design/icons";
import styles from "../Posts.module.scss";
import {
  deletePost,
  getPosts,
  setLikesCount,
} from "../../../redux/slices/posts/asyncActions";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, isToday } from "date-fns";

type PropsType = {
  isMe: boolean;
};

const PostsContent: FC<PropsType> = ({ isMe }) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPosts(String(id)));
  }, [id]);

  const updateLikesToggle = (
    postId: string,
    likesCount: number,
    liked: boolean
  ) => {
    dispatch(setLikesCount({ postId, likesCount, liked }));
  };

  const onRemovePost = (postId: string) => {
    if (window.confirm("Вы действительно хотите удалить этот пост?")) {
      if (postId != null) {
        dispatch(deletePost(postId));
      }
    }
  };

  const getMessageTime = (createdAt: string) => {
    const createdAtDate = new Date(createdAt);
    if (isToday(createdAtDate)) {
      return format(createdAtDate, "HH:mm");
    } else {
      return format(createdAtDate, "dd.MM.yyyy");
    }
  };

  return (
    <>
      <div className={styles.postsContainer}>
        {posts.map((post) => {
          return (
            <div className={styles.postContainer}>
              <div className={styles.postTop}>
                <div className={styles.postAvatar}>
                  <img src={post.user.avatar || defaultAvatar} alt="Avatar" />
                </div>
                <div className={styles.postInfo}>
                  <div className={styles.postUserName}>
                    {post.user.fullName}
                  </div>
                  <div className={styles.postDate}>
                    {getMessageTime(post.createdAt)}
                  </div>
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
          );
        })}
      </div>
    </>
  );
};

export default PostsContent;
