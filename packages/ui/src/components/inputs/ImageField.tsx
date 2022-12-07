import { forwardRef, HTMLProps } from "react";

export const ImageField = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement>
>(({ label, id, ...props }, ref) => {
  return (
    <fieldset className="flex w-full flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input type="file" id={id} ref={ref} {...props} />
    </fieldset>
  );
});

ImageField.displayName = "ImageField";
