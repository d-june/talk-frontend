import { instance } from "./api";

export const usersAPI = {
  findUsers(name: string) {
    return instance.get("/user/find?query=" + name).then((res) => res.data);
  },
};
