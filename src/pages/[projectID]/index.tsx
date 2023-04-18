import { GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Schema } from "zod";
import ComponentWrapper from "~/components/ComponentWrapper";
import { api } from "~/utils/api";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  const { query } = useRouter();
  const { data, isFetching, isFetched } = api.project.getProject.useQuery(
    query.projectID as string,
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (isFetched) {
      if (data && data.Schema !== null) {
        localStorage.setItem("schema", data.Schema);
      }
      console.log(data?.Schema);
    }
  }, [isFetching]);
  console.log(query.projectID);

  const handelGetFiles = async () => {
    console.log("start");
    console.log(JSON.parse(localStorage.getItem("schema") as string));
    const schema = await fetch("http://localhost:1337/generate", {
      method: "POST",
      body: localStorage.getItem("schema"),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const fileData = await schema.text();

    const url = window.URL.createObjectURL(new Blob([fileData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `prisma.schema`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    //@ts-ignore
    link.parentNode.removeChild(link);
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <ComponentWrapper>
      <div className="pt-24 text-black">
        <h1 className="text-4xl font-bold">{data?.title}</h1>
        <div className="mx-[10%] mt-20 flex flex-row  justify-between">
          <Link
            href={`/${query.projectID}/createSchema`}
            className="flex h-[25vh] w-[25vw] cursor-pointer flex-col items-center justify-center rounded-2xl bg-white text-2xl font-bold drop-shadow-card hover:scale-105"
          >
            <img src="/prisma-icon.png" />
            Setup Prisma Schema
          </Link>
          <div className="flex h-[25vh] w-[25vw] cursor-pointer flex-col items-center justify-center rounded-2xl bg-white text-2xl font-bold drop-shadow-card hover:scale-105">
            <img src="/schema-icon.png" />
            Visualise Schema
          </div>
        </div>
        <div className="mt-32 flex items-center justify-center">
          <button
            onClick={handelGetFiles}
            className="align-center w-fit rounded-xl border-2 border-blue bg-white py-2 px-24 text-xl font-bold text-black drop-shadow-card hover:border-0 hover:bg-blue-grotto hover:text-white"
          >
            Download Files
          </button>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default index;
