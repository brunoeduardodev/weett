import { CameraIcon, UploadIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import { forwardRef, HTMLProps } from "react";

type Props = {
  preview?: string;
  error?: string;
  kind: "rectangle" | "circle";
} & HTMLProps<HTMLInputElement>;

const uploadBoxStyles = cva(
  "flex flex-col justify-center items-center border-dashed border-2 bg-opacity-50 gap-2 bg-cover bg-no-repeat bg-center",
  {
    variants: {
      hasPreview: {
        true: "border-none",
      },
      kind: {
        rectangle: "w-50 h-40",
        circle: "w-32 h-32 rounded-full",
      },
      error: {
        false: "bg-blue-700 border-blue-900",
        true: "border-red-500 bg-red-400",
      },
    },
    defaultVariants: {
      hasPreview: false,
      kind: "circle",
      error: false,
    },
  }
);

export const ImageField = forwardRef<HTMLInputElement, Props>(
  ({ label, id, kind, preview, error, ...props }, ref) => {
    return (
      <fieldset className="flex w-full flex-col gap-1">
        <label className="flex flex-col gap-1" htmlFor={`${id}`}>
          <span className="font-semibold text-sm">{label}</span>

          <div
            className={uploadBoxStyles({
              kind,
              hasPreview: !!preview,
              error: !!error,
            })}
            style={{
              backgroundImage: preview ? `url('${preview}')` : undefined,
            }}
          >
            <UploadIcon className="text-white w-6 h-8" />
          </div>

          {error && (
            <span className="text-red-500 text-sm font-semibold">{error}</span>
          )}
        </label>

        <input
          hidden
          id={id}
          ref={ref}
          type="file"
          accept="image/*"
          {...props}
        />
      </fieldset>
    );
  }
);

ImageField.displayName = "ImageField";
