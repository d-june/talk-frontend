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

  return (
    <>
      <div className={styles.postsContainer}>
        {posts.map((post) => {
          return (
            <div className={styles.postContainer}>
              <div className={styles.postAvatar}>
                <img src={post.user.avatar || defaultAvatar} alt="Avatar" />
              </div>
              <div>
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
                          updateLikesToggle(
                            post._id,
                            post.likes - 1,
                            post.liked
                          )
                        }
                      >
                        <HeartFilled className={styles.postLikesHeart} />
                        <div>{post.likes}</div>
                      </div>
                    ) : (
                      <div
                        className={styles.postLikes}
                        onClick={() =>
                          updateLikesToggle(
                            post._id,
                            post.likes + 1,
                            post.liked
                          )
                        }
                      >
                        <LikeOutlined />
                        <div>{post.likes}</div>
                      </div>
                    )}
                  </div>
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
