import { instance } from "./api";
import { LoginType, RegistrationData } from "../redux/slices/me/types";

export const meApi = {
  login(loginData: LoginType) {
    return instance.post("/user/login", loginData).then((res) => res.data);
  },
  registration(registrationData: RegistrationData) {
    return instance
      .post("/user/registration", registrationData)
      .then((res) => res.data);
  },
  verifyHash(hash: string) {
    return instance
      .get("/user/registration/verify?hash=" + hash)
      .then((res) => res.data);
  },
  getMe() {
    return instance.get("/user/me").then((res) => res.data);
  },
};
