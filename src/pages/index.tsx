import { type NextPage } from "next";
import Head from "next/head";
import NewProjectCard from "~/components/card/NewProjectCard";
import { AuthType, platformType } from "~/types/projectTypes";
import ComponentWrapper from "../components/ComponentWrapper";

const Home: NextPage = () => {
  return (
    <ComponentWrapper>
      <div className="w-3/4">
        <h2 className="border-b text-xl font-bold">Create New Project</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <NewProjectCard
            platform={platformType.Node}
            authType={AuthType.JWT}
          />
          <NewProjectCard
            platform={platformType.Node}
            authType={AuthType.Session}
          />
          <NewProjectCard platform={platformType.GO} authType={AuthType.JWT} />
          <NewProjectCard
            platform={platformType.GO}
            authType={AuthType.Session}
          />
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default Home;
