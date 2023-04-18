import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AuthType, platformType } from "~/types/projectTypes";
import { api } from "~/utils/api";

interface createProjectProps {}

const createProject: FC<createProjectProps> = ({}) => {
  const [title, setTitle] = useState<string>("");
  const [platform, setPlatform] = useState<platformType>();
  const [authType, setAuthType] = useState<AuthType>();
  const [database, setDatabase] = useState<string>();

  const { mutateAsync } = api.project.createProject.useMutation();
  const router = useRouter();
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      title.trim() === "" ||
      platform === undefined ||
      authType === undefined ||
      database === undefined
    )
      return alert("enter all values");
    console.log(title, platform, authType, database);
    const schema = JSON.stringify({
      database: database,
      name: title,
      models: [
        {
          name: "User",
          fields: [
            {
              name: "id",
              type: "String",
              isId: true,
              unique: true,
              list: false,
              required: true,
              kind: "scalar",
              documentation: "",
              relationField: false,
              default: "uuid()",
            },
            {
              name: "email",
              type: "String",
              isId: false,
              unique: true,
              list: false,
              required: true,
              kind: "scalar",
              documentation: "",
              relationField: false,
            },
            {
              name: "password",
              type: "String",
              isId: false,
              unique: false,
              list: false,
              required: true,
              kind: "scalar",
              documentation: "",
              relationField: false,
            },
            {
              name: "refreshTokens",
              type: "RefreshToken",
              isId: false,
              unique: false,
              list: true,
              required: false,
              kind: "object",
              documentation: "",
            },
            {
              name: "createdAt",
              type: "DateTime",
              isId: false,
              unique: false,
              list: false,
              required: true,
              kind: "scalar",
              documentation: "",
              relationField: false,
            },
            {
              name: "updatedAt",
              type: "DateTime",
              isId: false,
              unique: false,
              list: false,
              required: true,
              kind: "scalar",
              documentation: "",
              relationField: false,
            },
          ],
          documentation: "",
        },
        {
          name: "RefreshToken",
          fields: [
            {
              relationField: false,
              isUpdatedAt: false,
              documentation: "",
              default: "uuid()",
              required: true,
              type: "String",
              unique: true,
              list: false,
              isId: true,
              name: "id",
              kind: "",
            },
            {
              type: "String",
              isUpdatedAt: false,
              default: "",
              required: false,
              unique: false,
              isId: false,
              list: false,
              name: "hashedToken",
              relationField: false,
            },
            {
              type: "String",
              isUpdatedAt: false,
              default: "",
              required: false,
              unique: false,
              isId: false,
              list: false,
              name: "userId",
              relationField: false,
            },
            {
              type: "User",
              isUpdatedAt: false,
              default: "",
              required: false,
              unique: false,
              isId: false,
              list: false,
              name: "User",
              relationField: true,
            },
            {
              type: "Boolean",
              isUpdatedAt: false,
              default: "false",
              required: false,
              unique: false,
              isId: false,
              list: false,
              name: "revoked",
              relationField: false,
            },
            {
              type: "DateTime",
              isUpdatedAt: false,
              default: "now()",
              required: false,
              unique: false,
              isId: false,
              list: false,
              name: "createdAt",
              relationField: false,
            },
            {
              type: "DateTime",
              isUpdatedAt: true,
              default: "",
              required: false,
              unique: false,
              isId: false,
              list: false,
              name: "updatedAt",
              relationField: false,
            },
          ],
          enums: [],
        },
      ],
      enums: [],
    });
    const res = await mutateAsync({
      title: title,
      platform: platform,
      authType: authType,
      database: database,
      Schema: schema,
    });

    router.push(`/project/${res.id}`);
  };
  return (
    <div className=" mx-auto mt-16 h-[70vh] w-[60%] rounded-2xl bg-white font-bold text-black drop-shadow-card">
      <h1 className="p-10 text-xl md:text-4xl">Create Project</h1>
      <form
        className="mt-6 flex flex-col items-center justify-center gap-16 px-36 text-2xl"
        onSubmit={handelSubmit}
      >
        <label className="flex w-[70%] justify-between" htmlFor="title">
          <span className="w-[25%]">Title</span>
          <span>:&nbsp;</span>
          <input
            className="w-[60%] appearance-none border-b border-black bg-white text-xl focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="flex w-[70%] justify-between">
          <span className="w-[25%]">Platform</span>
          <span>:&nbsp;</span>
          <select
            className="flex w-[60%] appearance-none border-b border-black bg-white text-xl focus:outline-none"
            onChange={(e) => setPlatform(e.target.value as platformType)}
          >
            <option value="" selected disabled hidden>
              -- Select Environment --
            </option>
            <option value={platformType.Node}>NodeJS</option>
            <option value={platformType.GO} disabled>
              GOlang
            </option>
          </select>
        </label>
        <label className="flex w-[70%] justify-between">
          <span className="w-[25%]">Auth Type</span>
          <span>:&nbsp;</span>
          <select
            className="w-[60%] appearance-none border-b border-black bg-white text-xl focus:outline-none"
            onChange={(e) => setAuthType(e.target.value as AuthType)}
          >
            <option value="" selected disabled hidden>
              -- Select Auth --
            </option>
            <option value={AuthType.JWT}>JWT</option>
            <option value={AuthType.Session} disabled>
              auth0
            </option>
          </select>
        </label>
        <label className="flex w-[70%] justify-between">
          <span className="w-[25%]">Database</span>
          <span>:&nbsp;</span>
          <select
            className="w-[60%] appearance-none border-b border-black bg-white text-xl focus:outline-none"
            onChange={(e) => setDatabase(e.target.value)}
          >
            <option value="" selected disabled hidden>
              -- Select Database --
            </option>
            <option value="mySQL">mySQL</option>
            <option value="SQLite">SQLite</option>
            <option value="postgreSQL">postgreSQL</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-fit rounded-xl bg-blue-grotto py-2 px-24 text-white drop-shadow-card hover:border-2 hover:border-blue hover:bg-white hover:text-black"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default createProject;
