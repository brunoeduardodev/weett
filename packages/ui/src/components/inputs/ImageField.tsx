import { CameraIcon, UploadIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import { forwardRef, HTMLProps } from "react";

type Props = {
  preview?: string;
  kind: "rectangle" | "circle";
} & HTMLProps<HTMLInputElement>;

const uploadBoxStyles = cva(
  "flex flex-col justify-center items-center bg-blue-700 border-dashed border-2 border-blue-900 bg-opacity-50 gap-2 bg-cover bg-no-repeat bg-center",
  {
    variants: {
      hasPreview: {
        true: "border-none",
      },
      kind: {
        rectangle: "w-50 h-40",
        circle: "w-32 h-32 rounded-full",
      },
    },
  }
);

export const ImageField = forwardRef<HTMLInputElement, Props>(
  ({ label, id, kind, preview, ...props }, ref) => {
    return (
      <fieldset className="flex w-full flex-col gap-1">
        <label className="flex flex-col gap-1" htmlFor={`${id}`}>
          <span className="font-semibold text-sm">{label}</span>

          <div
            className={uploadBoxStyles({ kind, hasPreview: !!preview })}
            style={{ backgroundImage: `url('${preview}')` }}
          >
            <UploadIcon className="text-white w-6 h-8" />
          </div>
        </label>

        <input hidden id={id} ref={ref} type="file" {...props} />
      </fieldset>
    );
  }
);

ImageField.displayName = "ImageField";
