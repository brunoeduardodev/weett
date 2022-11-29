import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  variant: "primary" | "secondary";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white transition-colors ease-in-out duration-300 uppercase py-3 px-6 font-bold rounded-lg min-w-[200px]"
        {...props}
      >
        {children}
      </button>
    );
  }
);
