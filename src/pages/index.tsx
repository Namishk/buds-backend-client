import { type NextPage } from "next";
import Head from "next/head";
import NewProjectCard from "~/components/card/NewProjectCard";
import { AuthType, platformType } from "~/types/projectTypes";
import ComponentWrapper from "../components/ComponentWrapper";

const Home: NextPage = () => {
  return (
    <ComponentWrapper>
      <div className="pt-24 text-black">
        <h2 className="text-3xl font-normal">Your Projects</h2>
        <div className="mt-4 flex flex-wrap gap-20">
          <NewProjectCard />
          <NewProjectCard />
          <NewProjectCard />
          <NewProjectCard />
          <NewProjectCard />
          <NewProjectCard />
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default Home;
