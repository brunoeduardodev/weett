import {
  CookieValueTypes,
  deleteCookie,
  getCookie,
  setCookie,
} from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { startTransition, useEffect, useState } from "react";
import { type ZodSchema } from "zod";
import dayjs, { ManipulateType } from "dayjs";

type UseCookieSyncOptions<T> = {
  key: string;
  defaultValue: T;
  schema: ZodSchema<T>;
  expiresIn: readonly [number, ManipulateType];
};

export const useCookieSync = <T extends CookieValueTypes>({
  key,
  schema,
  defaultValue,
  expiresIn,
}: UseCookieSyncOptions<T>) => {
  const [state, setState] = useState<T>(defaultValue);
  const [didInitialSync, setDidInitialSync] = useState(false);

  useEffect(() => {
    const value = getCookie(key);
    const parseResult = schema.safeParse(value);

    // Invalid cookie
    if (!parseResult.success) {
      deleteCookie(key);
      setDidInitialSync(true);
      return;
    }

    setState(parseResult.data);
    setDidInitialSync(true);
  }, []);

  useEffect(() => {
    if (!didInitialSync) return;
    if (!state) {
      deleteCookie(key);
      return;
    }

    setCookie(key, state, {
      domain: "localhost",
      expires: dayjs()
        .add(...expiresIn)
        .toDate(),
    });
  }, [state, didInitialSync, expiresIn]);

  return [state, setState] as const;
};
