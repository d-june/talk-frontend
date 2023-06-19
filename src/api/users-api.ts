import { instance } from "./api";

export const usersAPI = {
  getAllUsers() {
    return instance.get("/users").then((res) => res.data);
  },
  findUsers(name: string) {
    return instance.get("/user/find?query=" + name).then((res) => res.data);
  },
};
