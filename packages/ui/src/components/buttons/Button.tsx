import { cva, VariantProps } from "class-variance-authority";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
} from "react";

const buttonStyles = cva(
  [`flex justify-center transition-colors ease-in-out duration-300`],
  {
    variants: {
      intent: {
        primary: `text-white bg-blue-500 disabled:bg-blue-400 hover:bg-blue-600 active:bg-blue-700`,
        secondary: `text-blue-500 bg-blue-500 bg-opacity-0 disabled:text-opacity-10 hover:bg-opacity-10 active:bg-opacity-20`,
      },
      size: {
        small: `px-2 py-1 text-sm`,
        medium: `px-4 py-2 text-md`,
        large: `px-8 py-3 text-lg w-56`,
      },
      rounded: {
        none: ``,
        sm: `rounded-sm`,
        md: `rounded-md`,
        full: `rounded-full`,
      },
    },
    defaultVariants: {
      intent: "primary",
      rounded: "md",
      size: "medium",
    },
  }
);

type BaseButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type StyleProps = VariantProps<typeof buttonStyles>;

type Props = {
  isLoading?: boolean;
} & BaseButtonProps &
  StyleProps;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      intent,
      size,
      rounded,
      disabled,
      isLoading,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={buttonStyles({ intent, size, rounded }) + " " + className}
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
