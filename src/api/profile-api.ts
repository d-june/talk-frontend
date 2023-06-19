import { instance } from "./api";

export const profileApi = {
  getStatus(userId: string) {
    return instance.get("/user/status/" + userId).then((res) => res.data);
  },
  setStatus(status: string) {
    return instance
      .post("/user/status", { status: status })
      .then((res) => res.data);
  },
  getProfile(userId: string) {
    return instance.get("/user/profile/" + userId).then((res) => res.data);
  },
  updateProfile(
    fullName: string,
    birthday: Date | number,
    city: string,
    about: string,
    hobbies: string
  ) {
    return instance
      .post("/user/profile/", {
        fullName: fullName,
        birthday: birthday,
        city: city,
        about: about,
        hobbies: hobbies,
      })
      .then((res) => res.data);
  },
};
