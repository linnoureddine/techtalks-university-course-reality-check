import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "elevated";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        // shared size & layout
        "h-10 items-center justify-center rounded-lg px-6 text-md transition-all",
        "focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:ring-offset-2",
        "shadow-md hover:shadow-lg",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#6155F5] text-white hover:bg-[#503fdc]",
  elevated: "bg-white text-[#6155F5] hover:bg-gray-50",
};
