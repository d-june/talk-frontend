import { Col, Row } from "antd";
import { useAppSelector } from "../../../hooks/hooks";
import defaultAvatar from "../../../assets/img/cat.jpg";
import { LikeOutlined } from "@ant-design/icons";
import styles from "../Posts.module.scss";

const PostsContent = () => {
  const { posts } = useAppSelector((state) => state.posts);

  return (
    <>
      <div className={styles.postsContainer}>
        {posts.map((post) => {
          return (
            <div className={styles.postContainer}>
              <div className={styles.postAvatar}>
                <img src={post.userAvatar || defaultAvatar} alt="Avatar" />
              </div>
              <div>
                <div className={styles.postContent}>
                  <div>{post.postText}</div>
                  <div className={styles.postLikes}>
                    <div>
                      <LikeOutlined />
                    </div>
                    <div>{post.likesCount}</div>
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
