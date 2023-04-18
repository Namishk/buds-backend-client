import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

const Tag = ({ children }: TagProps) => (
  <div className="rounded bg-blue-grotto py-0.5 px-1 text-base text-white">
    {children}
  </div>
);

export default Tag;
