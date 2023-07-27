import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import { getPosts } from "../../../redux/slices/posts/asyncActions";

import { Post } from "../../index";

import { Empty } from "antd";
import styles from "../Posts.module.scss";

type PropsType = {
  isMe: boolean;
};

const PostsContent: FC<PropsType> = ({ isMe }) => {
  const { posts, isLoading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPosts(String(id)));
  }, [id, dispatch]);

  return (
    <>
      <div className={styles.postsContainer}>
        {posts.length > 0 || isLoading ? (
          <>
            <h2 className={styles.postsTitle}>Посты</h2>
            {posts.map((post) => {
              return (
                <Post
                  post={post}
                  key={post._id}
                  isMe={isMe}
                  id={id}
                  isLoading={isLoading}
                />
              );
            })}
          </>
        ) : (
          <div className={styles.postsEmpty}>
            <Empty description="Постов еще нет" />
          </div>
        )}
      </div>
    </>
  );
};

export default PostsContent;
