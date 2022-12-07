import { uploadFile } from "@/services/upload";
import { ImageField } from "@weett/ui";
import { forwardRef } from "react";

type Props = {
  endpoint: "profile-picture" | "banner";

  label: string;
  id: string;
  name: string;
  onChange: () => void;
  onBlur: () => void;
};

export const AutoUploadImage = forwardRef<typeof ImageField, Props>(
  ({ id, label, name, onBlur, onChange }, ref) => {
    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const res = await uploadFile(file, { endpoint: "profile-picture" });
      console.log({ res });
    };

    return (
      <ImageField label={label} name={name} id={id} onChange={handleOnChange} />
    );
  }
);
