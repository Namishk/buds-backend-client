import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const ComponentWrapper = ({ children }: Props) => {
  return (
    <>
      <main className="m-auto w-4/5 pt-8">{children}</main>
    </>
  );
};

export default ComponentWrapper;
