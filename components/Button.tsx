import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

<<<<<<< HEAD
type ButtonVariant = "primary" | "elevated";
=======
type ButtonVariant = "primary" | "elevated" | "plain";
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a

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
<<<<<<< HEAD
        // shared size & layout
        "inline-flex h-10 items-center justify-center rounded-lg px-6 text-md transition-all",
        "focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:ring-offset-2",
=======
        "h-10 items-center justify-center rounded-lg px-6 text-md transition-all",
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
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
<<<<<<< HEAD
  primary: "bg-[#6155F5] text-white hover:bg-[#503fdc]",
  elevated: "bg-white text-[#6155F5] hover:bg-gray-50",
=======
  primary:
    "bg-[#6155F5] text-white hover:bg-[#503fdc] focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:ring-offset-2",
  elevated:
    "bg-white text-[#6155F5] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:ring-offset-2",
  plain: "bg-transparent hover:shadow-none focus:ring-0",
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
};
