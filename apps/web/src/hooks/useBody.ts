import { useIsClient } from "./useIsClient";

export const useBody = () => {
  const isClient = useIsClient();
  if (!isClient) return null;

  return document.body;
};
