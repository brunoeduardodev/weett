import { uploadFile } from "@/services/upload";
import { ImageField } from "@weett/ui";
import { forwardRef, useState } from "react";

type Props = {
  endpoint: "profile-picture" | "banner";
  label: string;
  id: string;
  name: string;
  kind: "circle" | "rectangle";
  onChange: any;
  onBlur: any;
};

export const AutoUploadImageField = forwardRef<typeof ImageField, Props>(
  ({ id, label, name, kind, onBlur, onChange }, ref) => {
    const [imageUrl, setImageUrl] = useState<string>();

    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const res = await uploadFile(file, { endpoint: "profile-picture" });
      setImageUrl(res.url);
    };

    return (
      <div className="flex flex-col gap-2 w-full">
        <ImageField
          kind={kind}
          label={label}
          name={name}
          id={id}
          onChange={handleOnChange}
          preview={imageUrl}
        />
      </div>
    );
  }
);
