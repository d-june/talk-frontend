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
import { useEffect } from "react";

const PostsContent = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts("644bfdeabab5a5f1c7416c4f"));
  }, [posts]);

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
                  <div
                    className={styles.deletePost}
                    onClick={() => onRemovePost(post._id)}
                  >
                    <DeleteOutlined />
                  </div>
                  <div className={styles.postLikes}>
                    <div>
                      {post.liked ? (
                        <HeartFilled
                          className={styles.postLikesHeart}
                          onClick={() =>
                            updateLikesToggle(
                              post._id,
                              post.likes - 1,
                              post.liked
                            )
                          }
                        />
                      ) : (
                        <LikeOutlined
                          onClick={() =>
                            updateLikesToggle(
                              post._id,
                              post.likes + 1,
                              post.liked
                            )
                          }
                        />
                      )}
                    </div>
                    <div>{post.likes}</div>
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
