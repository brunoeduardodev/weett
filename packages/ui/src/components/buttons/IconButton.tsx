import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = {} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const IconButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`p-2 w-8 h-8 flex justify-center items-center rounded-full bg-transparent border-none hover:bg-blue-100 ${className}`}
    >
      {children}
    </button>
  );
};
