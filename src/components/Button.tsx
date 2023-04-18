import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Ref,
  forwardRef,
} from "react";
import { HeroIcon } from "~/types/projectTypes";

import classNames from "~/utils/classNames";
import Spinner from "./Spinner";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  className?: string;
  icon?: HeroIcon;
  block?: boolean;
}

const Button = (
  {
    variant = "primary",
    block = true,
    isLoading,
    icon: Icon,
    className,
    children,
    ...rest
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) => {
  const disabled = rest.disabled || isLoading;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={classNames(
        "relative select-none rounded-md py-2 px-4 text-sm font-medium disabled:opacity-50",
        "focus:outline-none focus-visible:ring-1",
        {
          primary: classNames(
            "bg-gray-900 text-white enabled:hover:bg-gray-700 enabled:focus-visible:bg-gray-700 enabled:focus-visible:ring-white",
            "dark:bg-white dark:text-black dark:enabled:hover:bg-neutral-200 dark:enabled:focus-visible:bg-neutral-200 dark:enabled:focus-visible:ring-white"
          ),
          secondary: classNames(
            "bg-gray-100 enabled:hover:bg-gray-200 enabled:focus-visible:bg-gray-200 enabled:focus-visible:ring-black",
            "dark:bg-neutral-800 dark:enabled:hover:bg-neutral-700 dark:enabled:focus-visible:bg-neutral-700 dark:enabled:focus-visible:ring-white"
          ),
        }[variant],
        block && "w-full",
        className
      )}
      ref={ref}
    >
      <span>{children}</span>

      {isLoading ? (
        <Spinner
          size="small"
          className="absolute right-3 top-1/2 -translate-y-1/2 transform"
        />
      ) : (
        Icon && (
          <Icon className="absolute right-3 top-1/2 w-3.5 -translate-y-1/2 transform" />
        )
      )}
    </button>
  );
};

export default forwardRef(Button);
