import { instance } from "./api";

export const filesApi = {
  upload(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    return instance.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
