import { instance } from "./api";

export const postsApi = {
  getPosts(userId: string) {
    return instance.get(`/posts/${userId}`).then((res) => res.data);
  },
  sendPost(text: string) {
    return instance
      .post("/posts", {
        text: text,
      })
      .then((res) => res.data);
  },
  setLikesCount(postId: string, likesCount: number, liked: boolean) {
    return instance
      .post(`/post/likes?id=${postId}`, { likes: likesCount, liked: !liked })
      .then((res) => res.data);
  },
  removeById(id: string) {
    return instance.delete("/posts?id=" + id).then((res) => res.data);
  },
};
