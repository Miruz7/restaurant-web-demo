import { forwardRef } from "react";
import { cn } from "../../../lib";
import {
  BUTTON_BASE,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from "./Button.config";
import type { ButtonProps } from "./Button.types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = DEFAULT_BUTTON_VARIANT,
    size = DEFAULT_BUTTON_SIZE,
    fullWidth = false,
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    className,
    type = "button",
    "aria-disabled": ariaDisabled,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const buttonClasses = cn(
    BUTTON_BASE,
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    fullWidth && "w-full",
    className,
  );

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={ariaDisabled ?? isDisabled}
      aria-busy={loading || undefined}
      className={buttonClasses}
      {...rest}
    >
      {loading ? (
        <span className="contents opacity-0 pointer-events-none" aria-hidden>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});

export default Button;
