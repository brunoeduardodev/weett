import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const TextButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      type="button"
      className={`bg-transparent border-none rounded-sm text-blue-500 hover:underline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
