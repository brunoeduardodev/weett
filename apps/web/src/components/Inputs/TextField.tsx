import React, { HTMLProps } from "react";

type Props = {
  label: string;
  placeholder: string;
  id: string;
  error?: string;
} & HTMLProps<HTMLInputElement>;

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder, error, id, ...props }, ref) => {
    const hasError = !!error;

    return (
      <fieldset
        className={`flex w-full flex-col gap-1 ${
          hasError ? "text-red-500" : "text-slate-600"
        }`}
      >
        <label className="font-semibold text-sm" htmlFor={id}>
          {label}
        </label>
        <input
          className="w-full p-3 rounded-md"
          id={id}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        {hasError && <span className="text-sm">{error}</span>}
      </fieldset>
    );
  }
);
