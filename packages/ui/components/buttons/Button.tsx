import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  variant: "primary" | "secondary";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant, disabled, isLoading, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`flex justify-center bg-blue-600 disabled:bg-blue-500 disabled:pointer-events-none hover:bg-blue-700 active:bg-blue-800 text-white transition-colors ease-in-out duration-300 uppercase py-3 px-6 font-bold rounded-lg min-w-[200px] ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin w-5 h-5 rounded-full border-2 border-solid border-blue-300 border-r-white" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
