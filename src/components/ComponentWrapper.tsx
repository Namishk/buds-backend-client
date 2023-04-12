import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const ComponentWrapper = ({ children }: Props) => {
  return (
    <>
      <main className="ml-[10%] pt-8">{children}</main>
    </>
  );
};

export default ComponentWrapper;
