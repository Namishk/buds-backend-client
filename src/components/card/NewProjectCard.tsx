import { useSession } from "next-auth/react";
import { FC } from "react";
import { useRouter } from "next/navigation";
const NewProjectCard: FC = () => {
  const { status } = useSession();
  const { push } = useRouter();
  const handelClick = async () => {
    if (status !== "authenticated") {
      return alert("Login to create a project");
    }

    return push("/createProject");
  };
  return (
    <div
      className="card aspect-3/2 h-56 cursor-pointer bg-blue-grotto drop-shadow-card hover:scale-105"
      onClick={() => handelClick()}
    >
      <div className="card-body flex-col items-center justify-center text-center text-white">
        <span className="text-5xl font-bold">+</span>
        <span className="text-xl">Add Project</span>
      </div>
    </div>
  );
};
export default NewProjectCard;
