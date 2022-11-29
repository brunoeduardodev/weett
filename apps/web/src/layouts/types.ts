import { PropsWithChildren, ReactElement } from "react";

export type WithLayout<T> = T & {
  Layout: ({ children }: PropsWithChildren) => ReactElement;
};

export const hasLayout = <T>(Component: T): Component is WithLayout<T> => {
  return "Layout" in Component;
};
