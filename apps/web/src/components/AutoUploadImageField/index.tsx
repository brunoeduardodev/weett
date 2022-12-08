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
  onChange: (imageUrl: string) => void;
};

export const AutoUploadImageField = forwardRef<
  ComponentRef<typeof ImageField>,
  Props
>(({ id, label, value, name, kind, onChange }, ref) => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const res = await uploadFile(file, { endpoint: "profile-picture" });
    setImageUrl(res.url);
    onChange(res.url);
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
        preview={imageUrl}
      />
    </div>
  );
});
