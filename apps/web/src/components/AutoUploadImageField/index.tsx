import { uploadFile } from "@/services/upload";
import { ImageField } from "@weett/ui";
import { ComponentRef, forwardRef, useEffect, useState } from "react";

type Props = {
  endpoint: "profile-picture" | "banner";
  label: string;
  id: string;
  name: string;
  kind: "circle" | "rectangle";
  value?: string;
  error?: string;
  onChange: (imageUrl: string) => void;
};

export const AutoUploadImageField = forwardRef<
  ComponentRef<typeof ImageField>,
  Props
>(
  (
    { id, label, value: fieldValue, error: fieldError, name, kind, onChange },
    ref
  ) => {
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
      setPreviewUrl(fieldValue);
    }, [fieldValue]);

    useEffect(() => {
      setError(error);
    }, [fieldError]);

    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const res = await uploadFile(file, { endpoint: "profile-picture" });

      if ("error" in res) {
        setError(res.error);
        setPreviewUrl(undefined);

        return;
      }

      setPreviewUrl(res.url);
      onChange(res.url);
      setError(undefined);
    };

    return (
      <div className="flex flex-col gap-2 w-full">
        <ImageField
          ref={ref}
          kind={kind}
          label={label}
          name={name}
          id={id}
          onChange={handleOnChange}
          error={error}
          preview={previewUrl}
        />
      </div>
    );
  }
);
