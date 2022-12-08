import { envs } from "@/config/env";

type UploadFileOptions = {
  endpoint: "profile-picture" | "banner";
};

export const uploadFile = async (
  file: File,
  { endpoint }: UploadFileOptions
) => {
  const url = `${envs.uploadUrl}/${endpoint}`;

  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data as { url: string } | { error: string };
};
