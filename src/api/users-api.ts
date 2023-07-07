import { instance } from "./api";

export const usersAPI = {
  getAllUsers(page: number) {
    return instance.get(`/users?page=${page}`).then((res) => res.data);
  },
  findUsers(name: string) {
    return instance.get(`/user/find?query=${name}`).then((res) => res.data);
  },
};
