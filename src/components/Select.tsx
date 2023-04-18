import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import classNames from "~/utils/classNames";

interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string;
}

export default function Select({
  label,
  children,
  className,
  ...rest
}: SelectProps) {
  return (
    <div className={classNames("w-full", className)}>
      <label htmlFor={rest.id} className="label">
        {label}
      </label>

      <select className="input w-full" {...rest}>
        {children}
      </select>
    </div>
  );
}
