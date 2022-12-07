import { envs } from "@/config/env";

type UploadFileOptions = {
  endpoint: "avatar" | "banner";
};

export const uploadFile = (file: File, { endpoint }: UploadFileOptions) => {
  const url = `${envs.uploadUrl}/${endpoint}`;

  const formData = new FormData();
  formData.append("file", file);

  return fetch(url, {
    method: "POST",
    body: formData,
  });
};
